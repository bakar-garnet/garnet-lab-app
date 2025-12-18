const fs = require("fs");
const path = require("path");

(async () => {
  console.log("file_spray: start");
  const dir = path.join(process.cwd(), "spray_tmp");
  fs.mkdirSync(dir, { recursive: true });

  for (let i = 0; i < 25; i++) {
    const f = path.join(dir, `f_${i}.txt`);
    fs.writeFileSync(f, `spray ${i}`);
    fs.readFileSync(f);
  }

  for (let i = 0; i < 25; i++) {
    fs.unlinkSync(path.join(dir, `f_${i}.txt`));
  }

  fs.rmdirSync(dir);
  console.log("file_spray: complete");
  process.exit(0);
})();
