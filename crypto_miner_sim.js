const crypto = require("crypto");
const https = require("https");

(async () => {
  console.log("crypto_miner_sim: start");

  let buf = Buffer.from("seed");
  for (let i = 0; i < 25000; i++) {
    buf = crypto.createHash("sha256").update(buf).digest();
  }

  await new Promise((resolve) => {
    https.get("https://example.com/?pool=cloud-miner", (res) => {
      res.on("data", () => {});
      res.on("end", resolve);
    }).on("error", resolve);
  });

  console.log("crypto_miner_sim: complete");
  process.exit(0);
})();

