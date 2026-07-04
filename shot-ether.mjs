import { chromium } from "playwright";

const base = "http://localhost:6088/iframe.html";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 880 },
  deviceScaleFactor: 1.5,
});

const shots = [
  ["concepts-ether-landing--default", "ether-landing.png"],
  ["components-hudpanel--with-tags", "ether-hudpanel.png"],
];

for (const [id, file] of shots) {
  const url = `${base}?id=${id}&globals=theme:ether&viewMode=story`;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `preview/${file}` });
  console.log("shot", file);
}

await browser.close();
console.log("ok");
