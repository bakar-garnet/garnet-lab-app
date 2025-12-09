const axios = require("axios");

// ---- Malicious IPs/domains for Garnet detection ----
const maliciousHosts = [
  "http://45.67.230.99",
  "http://185.244.25.10",
  "http://91.212.150.113",
  "http://malicious-update-server.com",
  "http://command-control-botnet.net"
];

async function testConnections() {
  console.log("Starting outbound tests...");

  for (const host of maliciousHosts) {
    try {
      console.log("Attempting connection to:", host);
      await axios.get(host, { timeout: 2000 });
    } catch (err) {
      console.log("Blocked or unreachable (expected):", host);
    }
  }

  console.log("Finished outbound attempts.");
}

testConnections();
