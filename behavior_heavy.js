const fs = require("fs");
const path = require("path");
const https = require("https");
const { execSync } = require("child_process");

function safeGet() {
  return new Promise((resolve) => {
    https.get("https://example.com", (res) => {
      res.on("data", () => {});
      res.on("end", resolve);
    }).on("error", resolve);
  });
}

function fileOps() {
  const p = path.join(process.cwd(), "tmp_behavior.txt");
  fs.writeFileSync(p, "behavior test\n");
  fs.readFileSync(p);
  fs.unlinkSync(p);
}

function shellOps() {
  try {
    execSync("whoami || uname -a", { stdio: "ignore" });
  } catch {}
}

function envRecon() {
  console.log("env sample:", Object.keys(process.env).slice(0, 15));
}

(async () => {
  console.log("behavior_heavy: start");
  await safeGet();
  fileOps();
  shellOps();
  envRecon();
  console.log("behavior_heavy: complete");
  process.exit(0);
})();

