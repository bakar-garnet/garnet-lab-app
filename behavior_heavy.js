//
// behavior_heavy.js
// Generates network, file, shell, recon, and directory enumeration
//

const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');
const path = require('path');

// ---------------------
// Network activity
// ---------------------
function httpRequest() {
  return new Promise((resolve) => {
    const req = https.get('https://example.com', (res) => {
      res.on('data', () => {});
      res.on('end', resolve);
    });
    req.on('error', () => resolve());
  });
}

// ---------------------
// File write → read → delete
// ---------------------
function fileActivity() {
  const p = 'tmp-behavior.txt';
  fs.writeFileSync(p, 'behavior test ' + Date.now());
  fs.readFileSync(p, 'utf8');
  fs.unlinkSync(p);
}

// ---------------------
// Spawn shell process
// ---------------------
function shellActivity() {
  try {
    execSync('uname -a || whoami', { stdio: 'ignore' });
  } catch {}
}

// ---------------------
// Environment key dump
// ---------------------
function dumpEnvSample() {
  const keys = Object.keys(process.env).slice(0, 20);
  console.log('Environment keys:', keys);
}

// ---------------------
// Directory enumeration
// ---------------------
function crawlWorkspace() {
  try {
    const base = process.cwd();
    const entries = fs.readdirSync(base);
    console.log('Workspace files:', entries);
  } catch (e) {
    console.error('Directory crawl failed:', e.message);
  }
}

// ---------------------
// Main
// ---------------------
async function main() {
  console.log('Starting behavior_heavy...');

  await httpRequest();  
  fileActivity();        
  shellActivity();        
  dumpEnvSample();        
  crawlWorkspace();       

  console.log('behavior_heavy complete');
}

main();
