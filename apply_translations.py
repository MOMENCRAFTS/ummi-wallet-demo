"""
Apply improved Arabic translations from TSV file.
Only applies rows where improved_ar differs from ar (i.e. note != 'kept*').
"""
import csv, os, re

TSV_PATH = r'C:\Users\docph\Downloads\improved_ar_translations_full.tsv'
SRC_ROOT = r'C:\Users\docph\.gemini\antigravity-ide\scratch\ummi-wallet-demo\src'

# Read TSV
changes = []
with open(TSV_PATH, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f, delimiter='\t')
    for row in reader:
        note = row.get('note', '').strip()
        if note.startswith('kept'):
            continue
        if note == 'preserve empty string':
            continue
        old_ar = row['ar'].strip()
        new_ar = row['improved_ar'].strip()
        if old_ar == new_ar:
            continue
        changes.append({
            'file': row['file'].strip(),
            'line': int(row['line']),
            'en': row['en'].strip(),
            'old_ar': old_ar,
            'new_ar': new_ar,
        })

print(f"Found {len(changes)} changes to apply")

# Group by file
from collections import defaultdict
by_file = defaultdict(list)
for c in changes:
    by_file[c['file']].append(c)

applied = 0
failed = []

for rel_file, file_changes in by_file.items():
    # Resolve path
    if rel_file.startswith('components\\'):
        full_path = os.path.join(SRC_ROOT, rel_file)
    elif rel_file == 'App.tsx':
        full_path = os.path.join(SRC_ROOT, 'App.tsx')
    else:
        full_path = os.path.join(SRC_ROOT, rel_file)
    
    if not os.path.exists(full_path):
        print(f"  SKIP (file not found): {rel_file}")
        for c in file_changes:
            failed.append(c)
        continue
    
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    for c in file_changes:
        old = c['old_ar']
        new = c['new_ar']
        
        # Simple string replacement - replace exact Arabic string
        # We need to be careful to only replace within the isAr ternary context
        # Try exact match first
        if old in content:
            # Count occurrences
            count = content.count(old)
            if count == 1:
                content = content.replace(old, new)
                applied += 1
            else:
                # Multiple occurrences - try line-targeted replacement
                lines = content.split('\n')
                target_line = c['line'] - 1  # 0-indexed
                # Search in a window around the target line
                found = False
                for offset in range(0, 5):
                    for li in [target_line + offset, target_line - offset]:
                        if 0 <= li < len(lines) and old in lines[li]:
                            lines[li] = lines[li].replace(old, new, 1)
                            found = True
                            break
                    if found:
                        break
                if found:
                    content = '\n'.join(lines)
                    applied += 1
                else:
                    # Just do first occurrence replacement
                    content = content.replace(old, new, 1)
                    applied += 1
        else:
            failed.append(c)
    
    if content != original_content:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Updated: {rel_file} ({len(file_changes)} changes)")

print(f"\nApplied: {applied}")
print(f"Failed: {len(failed)}")
if failed:
    print("\nFailed replacements:")
    for c in failed:
        print(f"  {c['file']}:L{c['line']} | old_ar='{c['old_ar']}' | new_ar='{c['new_ar']}'")
