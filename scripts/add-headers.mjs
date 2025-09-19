import fs from 'fs';
import path from 'path';

function walk(dirPath, shouldInclude) {
  const results = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(fullPath, shouldInclude));
    } else if (shouldInclude(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

function generateDescription(relPath) {
  const lower = relPath.toLowerCase();
  if (lower.includes('/components/')) return 'Reusable UI component for the app.';
  if (lower.includes('/screens/')) return 'Screen component rendered within app navigation.';
  if (lower.includes('/navigation/')) return 'Navigation stack/tab configuration.';
  if (lower.includes('/redux/')) return 'Redux state management logic (slice/store/selectors).';
  if (lower.includes('/utils/')) return 'Utility helpers and shared logic.';
  if (lower.includes('/api/')) return 'API client and request helpers.';
  if (lower.includes('/types/')) return 'Shared TypeScript type definitions.';
  if (lower.includes('/context/')) return 'React context and related hooks.';
  return 'Application module.';
}

function hasHeader(content) {
  const firstChunk = content.slice(0, 500);
  return /@file|@description|^\/\*[*!]/m.test(firstChunk);
}

function buildHeader(relPath) {
  const description = generateDescription(relPath);
  const now = new Date().toISOString();
  return `/**\n * @file ${relPath}\n * @description ${description}\n * @lastUpdated ${now}\n */\n\n`;
}

function main() {
  const projectRoot = process.cwd();
  const srcDir = path.join(projectRoot, 'src');
  if (!fs.existsSync(srcDir)) {
    console.error('src directory not found.');
    process.exit(1);
  }

  const files = walk(srcDir, (p) => {
    if (p.endsWith('.d.ts')) return false;
    return /\.(ts|tsx)$/.test(p);
  });

  let updatedCount = 0;

  for (const absPath of files) {
    const relPath = path.relative(projectRoot, absPath).replace(/\\/g, '/');
    const content = fs.readFileSync(absPath, 'utf8');
    if (hasHeader(content)) continue;
    const header = buildHeader(relPath);
    fs.writeFileSync(absPath, header + content, 'utf8');
    updatedCount += 1;
  }

  console.log(`Header insertion complete. Files updated: ${updatedCount}`);
}

main();


