// Renders the YouTube covers: node thumb.js  (run from reels/titanic with NODE_PATH=<kit>/node_modules and CHROME set)
// writes thumb/thumb_A_1920.png and thumb/thumb_B_1920.png
const { chromium } = require('playwright');
(async () => {
  const dir = __dirname;
  const browser = await chromium.launch({ ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}), args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', e => console.log('ERR', e.message));
  await page.goto('file://' + dir + '/web/thumb.html'); await page.evaluate(() => window.ready);
  for (const v of ['A', 'B']) { await page.evaluate(v => window.drawThumb(v), v); await page.locator('#c').screenshot({ path: dir + '/thumb/thumb_' + v + '_1920.png' }); }
  await browser.close();
})();
