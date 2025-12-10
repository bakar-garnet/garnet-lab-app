// network_domains.js
// Simulates requests to suspicious / fake / adult-like domains for detection testing

const https = require('https');

// All domains MUST be valid strings. No commas, no missing quotes, no trailing spaces.
const badDomains = [
  "example-malware-test.com",
  "notarealdomain12345.xyz",
  "fake-crypto-miner.io",
  "adult-content-sim-example.com",
  "phishing-test-domain.xyz",
  "badware-sim-domain.net",
  "dynamic-dns-test-1234.org",
  "vpn-flagged-endpoint.net",
  "tracking-sim-node.com",
  "gambling-test-domain.net"
];

// Simple GET request wrapper
function fetchDomain(domain) {
  return new Promise((resolve) => {
    const url = `https://${domain}`;

    const req = https.get(url, (res) => {
      res.on("data", () => {});
      res.on("end", () => resolve());
    });

    req.on("error", () => resolve()); // Don’t crash if domain doesn’t exist
  });
}

async function main() {
  console.log("Starting network_domains simulation...");

  for (const domain of badDomains) {
    console.log("Requesting:", domain);
    await fetchDomain(domain);
  }

  console.log("network_domains simulation complete");
}

main();

