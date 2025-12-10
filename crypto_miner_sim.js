// crypto_miner_sim.js
// Simulates hashing loops + fake mining traffic

const crypto = require('crypto');
const https = require('https');

async function fakeMiner() {
  for (let i = 0; i < 50000; i++) {
    crypto.createHash('sha256').update('block-' + i).digest();
  }
}

function miningCall() {
  return new Promise((resolve) => {
    const req = https.get("http://fake-mining-pool.cc", () => resolve());
    req.on("error", () => resolve());
  });
}

(async () => {
  console.log("Simulating miner activity…");
  await fakeMiner();
  await miningCall();
  console.log("crypto miner sim complete");
})();
