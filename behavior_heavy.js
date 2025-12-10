// behavior_heavy.js
// Simulates suspicious behavior safely for Garnet detection testing.

const fs = require('fs');
const path = require('path');
const net = require('net');
const https = require('https');
const { execSync } = require('child_process');

// 1. NETWORK: benign HTTPS request
function httpRequest() {
  return new Promise((resolve) => {
    const req = https.get('https://example.com', (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve());
    });

    req.on('error', () => resolve());
  });
}

// 2. ENV ENUMERATION
function dumpEnv() {
  const keys = Object.keys(process.env).slice(0, 20);
  console.log('Sample env keys:', keys);
}

// 3. DIRECTORY CRAWLING
function crawlHome() {
  try {
    const home = process.env.HOME || '/home/runner';
    const entries = fs.readdirSync(home).slice(0, 20);
    console.log('Home entries sample:', entries);
  } catch {}
}

// 4. FILE ACTIVITY
function fileActivity() {
  const file = 'tmp-garnet-behavior.txt';
  fs.writeFileSync(file, 'test ' + Date.now());
  fs.readFileSync(file, 'utf8');
  fs.unlinkSync(file);
}

// 5. FAKE “BAD IP” CONNECTION ATTEMPT (TEST-NET RANGE)
function attemptBadIpConnect() {
  const socket = net.connect(80, '198.51.100.42'); // Reserved test IP
  socket.on('error', () => {}); // Expected
}

// 6. SHELL ACTIVITY
function shellActivity() {
  try {
    execSync('uname -a || whoami', { stdio: 'ignore' });
  } catch {}
}

// 7. CPU LOOP
function busyLoop() {
  const start = Date.now();
  while (Date.now() - start < 500) {} // spin for 0.5s
}

// 8. MULTIPLE CHILD PROCESSES
function spawnChildren() {
  for (let i = 0; i < 3; i++) {
    try {
      execSync(`echo child-${i}`, { stdio: 'ignore' });
    } catch {}
  }
}

async function main() {
  console.log('Starting behavior_heavy simulation...');

  await httpRequest();
  dumpEnv();
  crawlHome();
  fileActivity();
  attemptBadIpConnect();
  shellActivity();
  busyLoop();
  spawnChildren();

  console.log('Completed behavior_heavy');
}

main();

// Add near the top:
const path = require('path');

// Add somewhere after other helpers:
function dumpEnvSample() {
  const keys = Object.keys(process.env).slice(0, 20);
  console.log('Sample env keys:', keys);
}

function crawlWorkspace() {
  try {
    const base = process.cwd();
    const entries = fs.readdirSync(base);
    console.log('Top-level entries in workspace:', entries);
  } catch (e) {
    console.error('Directory crawl failed:', e.message);
  }
}

// And call them from your main() function:
async function main() {
  console.log('Starting behavior_heavy script...');
  await httpRequest();
  fileActivity();
  shellActivity();
  dumpEnvSample();   // looks like recon
  crawlWorkspace();  // looks like discovery
  console.log('behavior_heavy complete');
}


