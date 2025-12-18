const fs = require("fs");
const https = require("https");

const CONTROLLED = "https://example.com";

const indicators = fs
  .readFileSync("blocklist.txt", "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean);

function hit(indicator, n) {
  const url = `${CONTROLLED}/?blocked=${encodeURIComponent(indicator)}&n=${n}`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      res.on("data", () => {});
      res.on("end", resolve);
    }).on("error", resolve);
  });
}

(async () => {
  console.log("network_domains: simulating blocklisted domains");
  let count = 0;

  for (const d of indicators) {
    for (let i = 0; i < 3; i++) {
      await hit(d, i);
      await new Promise((r) => setTimeout(r, 120));
      count++;
    }
  }

  console.log("network_domains: complete hits =", count);
  process.exit(0);
})();


