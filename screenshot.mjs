import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 1400 },
  deviceScaleFactor: 1.5,
});

const url = "file://" + process.cwd() + "/preview/index.html";

await page.goto(url);
await page.click('[data-set-theme="light"]');
await page.waitForTimeout(400);
await page.screenshot({ path: "preview/shot-light.png", fullPage: true });

await page.click('[data-set-theme="dark"]');
await page.waitForTimeout(400);
await page.screenshot({ path: "preview/shot-dark.png", fullPage: true });

await browser.close();
console.log("ok: preview/shot-light.png + preview/shot-dark.png");
