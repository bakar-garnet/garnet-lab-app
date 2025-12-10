// file_spray.js
// Creates lots of file access events

const fs = require('fs');

function spray() {
  for (let i = 0; i < 15; i++) {
    const p = `tmp-file-${i}.txt`;
    fs.writeFileSync(p, 'spray ' + i);
    fs.readFileSync(p, 'utf8');
    fs.unlinkSync(p);
  }
}

console.log("Running file spray...");
spray();
console.log("file_spray complete");
