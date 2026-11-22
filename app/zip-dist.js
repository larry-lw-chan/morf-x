// Pack each built app in dist/ into one download: .zip for Mac and Windows, .tar.gz for Linux (with the USB rule).
const { execFileSync } = require('child_process'), fs = require('fs'), path = require('path');
const dist = path.join(__dirname, 'dist'), v = require('./package.json').version;
// Download names say which computer each is for.
const NAMES = { 'darwin-arm64': 'Mac-Apple-Silicon', 'darwin-x64': 'Mac-Intel', 'win32-x64': 'Windows-64-bit',
  'linux-x64': 'Linux-64-bit-Intel-AMD', 'linux-arm64': 'Linux-ARM-64-bit' };
const run = (cmd, args) => execFileSync(cmd, args, { cwd: dist, stdio: 'inherit' });
for (const d of fs.readdirSync(dist).filter(d => d.startsWith('MORF-X-') && fs.statSync(path.join(dist, d)).isDirectory())) {
  const [, plat, arch] = d.match(/^MORF-X-(\w+)-(\w+)$/) || [];
  if (!plat) continue;
  if (plat === 'darwin') {
    const out = `MORF-X-${v}-${NAMES[plat + '-' + arch]}.zip`; fs.rmSync(path.join(dist, out), { force: true });
    run('ditto', ['-c', '-k', '--keepParent', path.join(d, 'MORF-X.app'), out]);
  } else if (plat === 'win32') {
    const out = `MORF-X-${v}-${NAMES[plat + '-' + arch]}.zip`; fs.rmSync(path.join(dist, out), { force: true });
    run('zip', ['-qry', out, d]);
  } else if (plat === 'linux') {
    for (const f of fs.readdirSync(path.join(__dirname, 'linux'))) fs.copyFileSync(path.join(__dirname, 'linux', f), path.join(dist, d, f));
    const out = `MORF-X-${v}-${NAMES[plat + '-' + arch]}.tar.gz`; fs.rmSync(path.join(dist, out), { force: true });
    run('tar', ['-czf', out, d]);
  } else continue;
  console.log('packed', d);
}
