const playwright = require('playwright');
let ss = 1000;

(async () => {
  for (const browserType of ['chromium']) { //'chromium', 'firefox', 'webkit'
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://staging.getherd.tech/');
    await page.fill('#email', 'absolut_admin@tigerpistol.com.au');
    await page.fill('#password', 'password');
    await page.screenshot({ path: `${ss++}-login.png` });
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `${ss++}-dashboard.png` });
    await browser.close();
  }
})();
