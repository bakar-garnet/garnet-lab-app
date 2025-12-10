// network_domains.js
// Intentionally "noisy" DNS / HTTP behavior for Jibril network detections.

const https = require('https');

const fakeDomains = [
  'fake-mining-test1.example',
  'fake-airdrop-login.example',
  'wallet-checker.testnet.example',
  'best-free-ai-tools-fake.example',
  'scam-dashboard-login.example',
];

const adultDomains = [
  // ⚠️ In real QA, replace with your *internal* test domains or real entries from your blocklist.
  'adult-content-test1.example',
  '18plus-streaming-test.example',
  'nsfw-category-test.example',
];

const randomWeirdDomains = Array.from({ length: 10 }, () => {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${rand}.algodomain-test.example`;
});

const allDomains = [...fakeDomains, ...adultDomains, ...randomWeirdDomains];

function hitDomain(domain) {
  return new Promise((resolve) => {
    const options = {
      hostname: domain,
      path: '/',
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(`Hit domain: ${domain} status=${res.statusCode}`);
        resolve();
      });
    });

    req.on('error', (err) => {
      console.log(`DNS/HTTP error for ${domain}:`, err.message);
      resolve(); // never fail CI because of network errors
    });

    req.end();
  });
}

async function main() {
  console.log('Starting network_domains noise...');
  for (const d of allDomains) {
    // Small delay to make events easier to read in the UI
    // and to avoid hammering anything.
    // eslint-disable-next-line no-await-in-loop
    await hitDomain(d);
  }
  console.log('network_domains complete');
}

main();
