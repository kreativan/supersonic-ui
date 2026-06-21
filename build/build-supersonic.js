import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const srcCssDir = path.join(projectRoot, 'src', 'css');
const distCssDir = path.join(projectRoot, 'dist', 'css');
const bundleEntry = path.join(srcCssDir, '_bundle.css');

function resolveCssImports(filePath, seen = new Set()) {
  const absolutePath = path.resolve(filePath);

  if (seen.has(absolutePath)) {
    return '';
  }

  seen.add(absolutePath);

  const content = fs.readFileSync(absolutePath, 'utf8');

  return content.replace(/@import\s+["']([^"']+)["'];?/g, (match, importPath) => {
    const resolvedImportPath = path.resolve(path.dirname(absolutePath), importPath);

    if (!resolvedImportPath.startsWith(srcCssDir)) {
      return '';
    }

    return resolveCssImports(resolvedImportPath, seen);
  });
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function writeBundle(outputPath, css) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, css);
}

fs.mkdirSync(distCssDir, { recursive: true });

execSync('vite build', { stdio: 'inherit' });

const bundledCss = resolveCssImports(bundleEntry);
const minifiedCss = minifyCss(bundledCss);

const outputs = [
  ['supersonic.css', bundledCss],
  ['supersonic.min.css', minifiedCss],
];

outputs.forEach(([fileName, css]) => {
  writeBundle(path.join(distCssDir, fileName), css);
});

console.log('CSS bundles generated in dist/css');