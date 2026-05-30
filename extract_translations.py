import os, re

src = r'C:\Users\docph\.gemini\antigravity-ide\scratch\ummi-wallet-demo\src'
out_lines = []
pattern = re.compile(r"""isAr\s*\?\s*(['"])(.*?)\1\s*:\s*(['"])(.*?)\3""")

total_pairs = 0

for root, dirs, files in os.walk(src):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for f in sorted(files):
        if not f.endswith('.tsx'):
            continue
        fpath = os.path.join(root, f)
        rel = os.path.relpath(fpath, src)
        with open(fpath, 'r', encoding='utf-8') as fh:
            lines = fh.readlines()
        
        pairs = []
        for i, line in enumerate(lines, 1):
            for m in pattern.finditer(line):
                ar, en = m.group(2), m.group(4)
                if ar in ('rtl', 'ltr', 'ar', 'en'):
                    continue
                pairs.append((i, en, ar))
        
        if pairs:
            total_pairs += len(pairs)
            out_lines.append('')
            out_lines.append('=' * 60)
            out_lines.append(f'{rel} ({len(pairs)} strings)')
            out_lines.append('=' * 60)
            for ln, en, ar in pairs:
                out_lines.append(f'  L{ln:>4}  EN: {en}')
                out_lines.append(f'        AR: {ar}')
                out_lines.append('')

# English-only section
out_lines.append('')
out_lines.append('#' * 60)
out_lines.append('ENGLISH-ONLY STRINGS (need Arabic)')
out_lines.append('#' * 60)
out_lines.append('')

app_path = os.path.join(src, 'App.tsx')
with open(app_path, 'r', encoding='utf-8') as fh:
    app_lines = fh.readlines()

out_lines.append('--- App.tsx: Tour Button ---')
for i, line in enumerate(app_lines, 1):
    stripped = line.strip()
    if 'Auto Tour' in stripped or 'Pause Tour' in stripped:
        out_lines.append(f'  L{i:>4}  {stripped}')

out_lines.append('')
out_lines.append('--- App.tsx: Track Labels (Now Playing) ---')
for i, line in enumerate(app_lines, 1):
    stripped = line.strip()
    if ": '" in stripped and any(t in stripped for t in ['pearl_gate', 'mothers_embrace', 'pulse_in_the_hall', 'blessing_hush', 'celebration_bloom', 'step_complete']):
        if 'import' not in stripped and '//' not in stripped and 'audio' not in stripped.lower():
            out_lines.append(f'  L{i:>4}  {stripped}')

out_lines.append('')
out_lines.append(f'TOTAL BILINGUAL PAIRS: {total_pairs}')
out_lines.append(f'TOTAL ENGLISH-ONLY: 8 (2 tour buttons + 6 track labels)')

result = '\n'.join(out_lines)
outfile = os.path.join(src, '..', 'TRANSLATIONS_FULL.txt')
with open(outfile, 'w', encoding='utf-8') as fh:
    fh.write(result)
print(f'Done: {total_pairs} bilingual pairs extracted to TRANSLATIONS_FULL.txt')
