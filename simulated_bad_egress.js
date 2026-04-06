const targets = [
  "https://registry.npmjs.org/",
  "https://httpbin.org/get",
  "https://example.com/"
];

async function hit(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "user-agent": "garnet-lab-app-egress-test"
      }
    });
    console.log(`[OK] ${url} -> ${res.status}`);
  } catch (err) {
    console.log(`[ERR] ${url} -> ${String(err)}`);
  }
}

async function main() {
  console.log("Starting simulated suspicious egress...");
  for (const url of targets) {
    await hit(url);
  }
  console.log("Finished simulated suspicious egress.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
