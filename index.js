const https = require("https");

const maliciousTargets = [
  "https://203.0.113.10",
  "https://198.51.100.5",
  "https://example-malware.test",
  "https://malicious.test"
];

console.log("🔴 Simulating malicious activity…");

maliciousTargets.forEach(target => {
  https.get(target, res => {
    console.log(`Attempted connection to: ${target} → Status: ${res.statusCode}`);
  }).on("error", err => {
    console.log(`Blocked or failed connection to: ${target}`);
  });
});

