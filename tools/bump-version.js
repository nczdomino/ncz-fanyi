#!/usr/bin/env node
/**
 * tools/bump-version.js - Automated Semantic Version Bumping & Release Script
 * 
 * Synchronizes versions across:
 *   - package.json
 *   - index.html (Settings about badge)
 *   - sw.js (Service Worker cache key to purge stale assets upon deployment)
 * 
 * Usage:
 *   node tools/bump-version.js [patch|minor|major|x.y.z] [--push] [--commit]
 * 
 * Examples:
 *   npm run bump          -> 1.1.0 -> 1.1.1 (local files only)
 *   npm run bump:minor    -> 1.1.0 -> 1.2.0 (local files only)
 *   npm run update        -> runs test suite, bumps version, commits & pushes to GitHub!
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const indexHtmlPath = path.join(rootDir, 'index.html');
const swJsPath = path.join(rootDir, 'sw.js');

// 1. Read package.json
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = pkg.version || '1.0.0';

// 2. Parse arguments
const args = process.argv.slice(2);
const shouldPush = args.includes('--push');
const shouldCommit = args.includes('--commit') || shouldPush;
const bumpType = args.find((a) => !a.startsWith('--')) || 'patch';

function calculateNewVersion(current, type) {
  if (/^\d+\.\d+\.\d+$/.test(type)) {
    return type;
  }
  const parts = current.split('.').map((n) => parseInt(n, 10));
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error(`Invalid current version: "${current}"`);
  }
  let [major, minor, patch] = parts;

  switch (type.toLowerCase()) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
    default:
      patch += 1;
      break;
  }
  return `${major}.${minor}.${patch}`;
}

const newVersion = calculateNewVersion(currentVersion, bumpType);
console.log(`\n🚀 [Halou] Bumping version: ${currentVersion} -> ${newVersion}`);

// 3. Update package.json
pkg.version = newVersion;
if (pkg.name !== 'halouzhongwen') {
  pkg.name = 'halouzhongwen';
}
fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log(`  ✅ package.json updated: version = ${newVersion}, name = halouzhongwen`);

// 4. Update index.html
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  const versionRegex = /<div id="app-version-badge"[^>]*>Version [^<]*<\/div>/;
  if (versionRegex.test(html)) {
    html = html.replace(
      versionRegex,
      `<div id="app-version-badge" style="font-size:12px; font-weight:600; color:var(--accent); margin-top:4px;">Version ${newVersion} Pro</div>`
    );
    console.log(`  ✅ index.html updated: #app-version-badge -> Version ${newVersion} Pro`);
  } else {
    console.warn(`  ⚠️ Warning: #app-version-badge element not found in index.html`);
  }

  const railVersionRegex = /<div class="rail-version">Halou · v[^<]*<\/div>/;
  if (railVersionRegex.test(html)) {
    html = html.replace(
      railVersionRegex,
      `<div class="rail-version">Halou · v${newVersion}</div>`
    );
    console.log(`  ✅ index.html updated: .rail-version -> Halou · v${newVersion}`);
  } else {
    console.warn(`  ⚠️ Warning: .rail-version element not found in index.html`);
  }
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
}

// 5. Update sw.js (Ensures browsers purge stale caches immediately upon new deployment)
if (fs.existsSync(swJsPath)) {
  let sw = fs.readFileSync(swJsPath, 'utf8');
  const swVersionRegex = /const VERSION = '[^']+';/;
  if (swVersionRegex.test(sw)) {
    const newCacheKey = `hl-v${newVersion}`;
    sw = sw.replace(swVersionRegex, `const VERSION = '${newCacheKey}';`);
    fs.writeFileSync(swJsPath, sw, 'utf8');
    console.log(`  ✅ sw.js updated: Cache version key = '${newCacheKey}'`);
  } else {
    console.warn(`  ⚠️ Warning: const VERSION not found in sw.js`);
  }
}

// 5.1. Re-generate static multilingual routes (/vi/, /en/, /ja/)
try {
  const i18nScript = path.join(__dirname, 'build-i18n-routes.js');
  if (fs.existsSync(i18nScript)) {
    execSync(`node "${i18nScript}"`, { cwd: rootDir, stdio: 'inherit' });
  }
} catch (e) {
  console.warn('  ⚠️ Warning: Failed to re-generate i18n routes:', e.message);
}

// 6. Optional Git Commit & Push
if (shouldCommit) {
  try {
    console.log(`\n📦 Staging modified files for git commit...`);
    execSync('git add -A', { cwd: rootDir, stdio: 'inherit' });
    
    // Check if there are staged changes
    const diff = execSync('git diff --cached --name-only', { cwd: rootDir, encoding: 'utf8' }).trim();
    if (diff) {
      const commitMsg = `chore(release): bump version to v${newVersion}`;
      execSync(`git commit -m "${commitMsg}"`, { cwd: rootDir, stdio: 'inherit' });
      console.log(`  ✅ Git commit created: "${commitMsg}"`);
    } else {
      console.log(`  ℹ️ No changes staged to commit.`);
    }

    if (shouldPush) {
      console.log(`\n🌐 Pushing release commit to GitHub (origin main)...`);
      execSync('git push origin main', { cwd: rootDir, stdio: 'inherit' });
      console.log(`  🎉 Pushed successfully! Cloudflare Pages build triggered automatically.\n`);
    }
  } catch (err) {
    console.error(`\n❌ Git operation failed:`, err.message);
    process.exit(1);
  }
} else {
  console.log(`\n💡 Version files updated locally. Run 'npm run update' to test, bump and push automatically!\n`);
}
