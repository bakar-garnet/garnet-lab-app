// crypto_miner_sim.js
// Simulates crypto-mining–like behavior in a SAFE + DETECTABLE way

const https = require("https");
const crypto = require("crypto");

function fakeMiningNetworkCall() {
  return new Promise((resolve) => {
    https
      .get("https://mining.example.com/ping", (res) => {
        res.on("data", () => {}); // ignore data
        res.on("end", resolve);
      })
      .on("error", (err) => {
        console.error("Miner network error:", err.message);
        resolve(); // Do not fail the job
      });
  });
}

function cpuStressLoop(iterations = 5_000_000) {
  console.log("CPU mining simulation started…");
  let hash = "";

  for (let i = 0; i < iterations; i++) {
    hash = crypto.createHash("sha256").update(hash + i).digest("hex");
  }

  console.log("CPU mining simulation complete.");
}

async function miningRoutine() {
  console.log("Simulating miner activity…");

  // Network attempt to fake mining pool
  await fakeMiningNetworkCall();

  // CPU-intensive hashing loop (mimics mining)
  cpuStressLoop();

  console.log("crypto_miner_sim complete.");
}

miningRoutine();
