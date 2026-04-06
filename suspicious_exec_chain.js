import { execSync } from "node:child_process";
import fs from "node:fs";

function run(label, cmd) {
  try {
    console.log(`\n[RUN] ${label}: ${cmd}`);
    const out = execSync(cmd, {
      stdio: "pipe",
      encoding: "utf8",
      shell: "/bin/bash"
    });
    if (out) {
      console.log(out.trim());
    }
  } catch (err) {
    console.log(`[ERR] ${label}: ${err.message}`);
  }
}

console.log("Starting simulated suspicious exec chain...");

run("system info", "uname -a");
run("process listing", "ps aux | head -n 5");
run("env sampling", "env | head -n 10");
run("network call through shell", "curl -I https://example.com || true");

try {
  const files = fs.readdirSync(".");
  console.log("[FILES]", files.slice(0, 20));
} catch (err) {
  console.log(`[ERR] file enumeration: ${err.message}`);
}

console.log("Finished simulated suspicious exec chain.");
