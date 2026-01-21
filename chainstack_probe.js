// chainstack_probe.js
const https = require('https');

function ping(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(`Pinged ${url} with status:`, res.statusCode);
        resolve();
      });
    });

    req.on('error', (err) => {
      console.error(`Error pinging ${url}:`, err.message);
      resolve();
    });
  });
}

(async () => {
  console.log('🔍 Probing chainstack.com...');
  await ping('https://chainstack.com');
  console.log('✅ Probe complete.');
})();
