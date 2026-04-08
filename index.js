const https = require("https");

function get(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      res.on("data", () => {});
      res.on("end", () => resolve(res.statusCode));
    });
    req.on("error", () => resolve(null));
  });
}

(async () => {
  console.log("test_app: starting");
  await get("https://example.com");
  require("./sympy_sim");  // 👈 Simulate typosquat access
  console.log("test_app: done");
  process.exit(0);
})();
