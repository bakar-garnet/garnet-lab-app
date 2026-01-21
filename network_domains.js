const https = require("https");

function get(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(`Connection to ${url} returned status: ${res.statusCode}`);
        resolve(res.statusCode);
      });
    });

    req.on("error", (err) => {
      console.log(`Failed to connect to ${url}:`, err.message);
      resolve(null);
    });
  });
}

(async () => {
  console.log("network_domains: starting");
  await get("https://giftshop.club"); 
  console.log("network_domains: done");
  process.exit(0);
})();
