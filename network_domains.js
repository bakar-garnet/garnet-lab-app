// network_domains.js
// Simulates contacting many domains (fake_domain_access, adult, phishing, etc.)

const https = require('https');

const fakeDomains = [
  "http://badmining.fake",
  "http://totally-not-malicious.xyz",
  "http://fake-phishing-login.top",
  "http://adult-content-access.biz",
  "http://random-miner-node.cc",
  "http://crypto-miner-pool.fake",
  "http://phishing-updates.site",
  "http://dns-tunnel-source.fake"
];

function hit(url) {
  return new Promise((resolve) => {
    const req = https.get(url, () => resolve());
    req.on("error", () => resolve());
  });
}

async function main() {
  console.log("Running domain spray simulation...");

  for (const d of fakeDomains) {
    console.log("Hitting:", d);
    await hit(d);
  }

  console.log("network_domains complete");
}

main();

