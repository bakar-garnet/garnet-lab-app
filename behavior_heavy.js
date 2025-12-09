// behavior_heavy.js
// Generates network, file, and shell activity without any extra npm packages

const fs = require('fs');
const { execSync } = require('child_process');
const https = require('https');

function httpRequest() {
  return new Promise((resolve, reject) => {
    const req = https.get('https://example.com', (res) => {
      res.on('data', () => {}); // just drain data
      res.on('end', () => resolve());
    });

    req.on('error', (err) => {
      console.error('HTTP error:', err.message);
      resolve(); // don’t fail the pipeline just because of network
    });
  });
}

function fileActivity() {
  const path = 'tmp-garnet-behavior.txt';
  fs.writeFileSync(path, 'behavior test ' + Date.now());
  fs.readFileSync(path, 'utf8');
  fs.unlinkSync(path);
}

function shellActivity() {
  try {
    // Simple, harmless system commands that still spawn a shell/process
    execSync('uname -a || whoami', { stdio: 'ignore' });
  } catch (e) {
    console.error('Shell command failed (non-fatal):', e.message);
  }
}

async function main() {
  console.log('Starting behavior_heavy script...');
  await httpRequest();   // network
  fileActivity();        // file write/read/delete
  shellActivity();       // spawn shell / process
  console.log('behavior_heavy complete');
}

main();
