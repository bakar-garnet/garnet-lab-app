// file_spray.js
// Creates, reads, and deletes a bunch of temp files for File Access detections.

const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join('.', 'tmp-garnet-spray');

function ensureDir() {
  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR);
  }
}

function sprayFiles(count = 20) {
  for (let i = 0; i < count; i += 1) {
    const filePath = path.join(BASE_DIR, `file-${Date.now()}-${i}.txt`);
    fs.writeFileSync(filePath, 'hello garnet ' + i);
    const data = fs.readFileSync(filePath, 'utf8');
    if (!data) console.log('empty read?', filePath);
  }
}

function cleanup() {
  const entries = fs.readdirSync(BASE_DIR);
  for (const name of entries) {
    const filePath = path.join(BASE_DIR, name);
    fs.unlinkSync(filePath);
  }
  // comment this out if you want directory to persist
  fs.rmdirSync(BASE_DIR);
}

function main() {
  console.log('Starting file_spray...');
  ensureDir();
  sprayFiles(30);
  cleanup();
  console.log('file_spray complete');
}

main();
