/** Constrói distribuição independente de servidor, sem dependências npm. */
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const ordered = [
  'src/data/questions.js',
  'src/data/catalog.js',
  'src/core/format.js',
  'src/core/analysis.js',
  'src/ui/charts.js',
  'src/ui/report.js',
  'src/ui/questionnaire.js',
  'src/main.js'
];
const files = await Promise.all(ordered.map(async path => (await readFile(resolve(root, path), 'utf8'))));
const combined = files.map((source, i) => {
  const removedImports = source.replace(/^import\s+[^\n]+;\s*$/gm, '');
  const plain = removedImports.replace(/^export\s+(?=(?:const|let|function|class)\b)/gm, '');
  if (/^\s*(import|export)\s/m.test(plain)) throw new Error(`Importação/exportação não resolvida: ${ordered[i]}`);
  return `// --- ${ordered[i]} ---\n${plain}`;
}).join('\n\n');
let html = await readFile(resolve(root, 'index.html'), 'utf8');
const css = await readFile(resolve(root, 'styles/main.css'), 'utf8');
const logo = (await readFile(resolve(root, 'assets/logo.png'))).toString('base64');
html = html.replace('<link href="styles/main.css" rel="stylesheet"/>', `<style>${css}</style>`);
html = html.replace('src="assets/logo.png"', `src="data:image/png;base64,${logo}"`);
html = html.replace('<script src="src/main.js" type="module"></script>', `<script>${combined.replace(/<\//g, '<\\/')}</script>`);
if (html.includes('src="src/main.js"') || html.includes('href="styles/main.css"')) throw new Error('Falha ao embutir recursos externos');
await mkdir(resolve(root, 'dist'), {recursive:true});
const destination = resolve(root, 'dist/Multimodal_Communication_Profile_Mr_Ornelas.html');
await writeFile(destination, html);
console.log(`Gerado: ${destination} (${Buffer.byteLength(html)} bytes)`);
