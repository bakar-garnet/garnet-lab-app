// dns_tunnel_sim.js
// Creates lots of subdomain DNS queries to simulate tunneling.

const https = require('https');

function hit(d) {
  return new Promise(resolve => {
    const req = https.get(d, () => resolve());
    req.on("error", () => resolve());
  });
}

async function main() {
  console.log("Simulating DNS tunnel traffic...");

  for (let i = 0; i < 15; i++) {
    const url = `http://${i}.xyz-miner-fake-domain.cc`;
    await hit(url);
  }

  console.log("dns_tunnel_sim complete");
}

main();
