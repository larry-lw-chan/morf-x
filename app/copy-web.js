// Copy the MORF-X web app and its files from ../web/app into ./web, so the app and the website share one source.
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, '..', 'web', 'app'), dst = path.join(__dirname, 'web');
fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });
console.log('copied web/app/ into app/web/');
