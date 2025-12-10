// behavior_heavy.js
// Generates network, file, shell, and recon-like activity without extra npm packages

const fs = require('fs');
const { execSync } = require('child_process');
const https = require('https');
const path = require('path');

// --- Network: simple HTTPS request ---
function httpRequest() {
  return new Promise((resolve) => {
    const req = https.get('https://example.com', (res) => {
      res.on('data', () => {}); // drain data, we don't care about body
      res.on('end', () => resolve());
    });

    req.on('error', (err) => {
      console.error('HTTP error:', err.message);
      // Don't fail the job just because the network call failed
      resolve();
    });
  });
}

// --- File activity: write -> read -> delete ---
function fileActivity() {
  const filePath = path.join(process.cwd(), 'tmp-garnet-behavior.txt');

  try {
    fs.writeFileSync(filePath, 'behavior test ' + Date.now());
    const contents = fs.readFileSync(filePath, 'utf8');
    console.log('Read back file contents (trimmed):', contents.slice(0, 50));
    fs.unlinkSync(filePath);
    console.log('Temp file removed:', filePath);
  } catch (e) {
    console.error('File activity failed (non-fatal):', e.message);
  }
}

// --- Shell activity: spawn a simple command ---
function shellActivity() {
  try {
    // Harmless commands, but they still spawn a shell / process tree
    execSync('uname -a || whoami', { stdio: 'ignore' });
    console.log('Shell command executed (uname / whoami).');
  } catch (e) {
    console.error('Shell command failed (non-fatal):', e.message);
  }
}

// --- Recon-ish: env / “secrets” enumeration sample ---
function dumpEnvSample() {
  const keys = Object.keys(process.env).slice(0, 20);
  console.log('Sample env keys:', keys);
}

// --- Discovery-ish: crawl the workspace directory ---
function crawlWorkspace() {
  try {
    const base = process.cwd();
    const entries = fs.readdirSync(base);
    console.log('Top-level entries in workspace:', entries);
  } catch (e) {
    console.error('Directory crawl failed:', e.message);
  }
}

// --- Main driver ---
async function main() {
  console.log('Starting behavior_heavy script...');

  await httpRequest();   // network
  fileActivity();        // file write / read / delete
  shellActivity();       // spawn shell / process
  dumpEnvSample();       // looks like env / secrets recon
  crawlWorkspace();      // looks like directory discovery

  console.log('behavior_heavy complete');
}

main();

