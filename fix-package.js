import fs from 'fs';
import path from 'path';

const distPackageJsonPath = path.join(process.cwd(), 'dist', 'package.json');

// Read package.json in dist folder
const packageJson = JSON.parse(fs.readFileSync(distPackageJsonPath, 'utf8'));

// Fix paths
packageJson.main = './fesm2022/ngfly-translate-db.mjs';
packageJson.module = './fesm2022/ngfly-translate-db.mjs';
packageJson.typings = './index.d.ts';

// Fix exports if they exist
if (packageJson.exports && packageJson.exports['.']) {
  packageJson.exports['.'] = {
    types: './index.d.ts',
    esm2022: './fesm2022/ngfly-translate-db.mjs',
    esm: './fesm2022/ngfly-translate-db.mjs',
    default: './fesm2022/ngfly-translate-db.mjs'
  };
}

// Remove the dist/ from files - it's not needed in the dist package.json
if (packageJson.files && packageJson.files.includes('dist/')) {
  packageJson.files = packageJson.files.filter(f => f !== 'dist/');
}

// Write it back
fs.writeFileSync(distPackageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

console.log('✅ dist/package.json has been fixed'); 