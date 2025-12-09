// index.js
// Simple “app” that just does a light network call

const https = require('https');

function ping() {
  return new Promise((resolve) => {
    const req = https.get('https://www.garnet.ai', (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('Pinged garnet.ai with status:', res.statusCode);
        resolve();
      });
    });

    req.on('error', (err) => {
      console.error('Ping error:', err.message);
      resolve();
    });
  });
}

(async () => {
  console.log('Running basic app ping...');
  await ping();
  console.log('Done.');
})();
