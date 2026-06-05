const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Use installed chrome-headless-shell
const CHROME_EXECUTABLE = 'C:\\Users\\Acer\\.cache\\puppeteer\\chrome-headless-shell\\win64-149.0.7827.22\\chrome-headless-shell-win64\\chrome-headless-shell.exe';

const projects = [
  { url: 'https://sudip-parajuli.com.np', file: 'sudip-parajuli.jpg' },
  { url: 'https://www.easymoto.com.np/public-home/', file: 'easymoto.jpg' },
  { url: 'https://techwired-solutions.vercel.app', file: 'techwired.jpg' },
  { url: 'https://aryalfarm.com.np', file: 'aryal-farm.jpg' },
  { url: 'https://amicus.com.np', file: 'amicus.jpg' },
];

const outDir = path.join(__dirname, '../public/images/projects');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_EXECUTABLE,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  for (const p of projects) {
    console.log(`Capturing ${p.url}...`);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1400, height: 900 });
      await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Small wait for any animations/lazy loads to settle
      await new Promise((r) => setTimeout(r, 1500));
      await page.screenshot({
        path: path.join(outDir, p.file),
        type: 'jpeg',
        quality: 85,
        clip: { x: 0, y: 0, width: 1400, height: 900 },
      });
      console.log(`  ✓ Saved ${p.file}`);
      await page.close();
    } catch (err) {
      console.error(`  ✗ Failed ${p.url}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\nAll screenshots done. Check public/images/projects/');
})();
