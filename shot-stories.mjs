import { chromium } from "playwright";

const base = "http://localhost:6077/iframe.html";
const shots = [
  { id: "components-button--all-variants", theme: "dark", file: "sb-button-dark" },
  { id: "components-card--default", theme: "light", file: "sb-card-light" },
  { id: "foundation-colors--theme-contract", theme: "dark", file: "sb-colors-dark" },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 900, height: 600 },
  deviceScaleFactor: 1.5,
});

for (const s of shots) {
  const url = `${base}?id=${s.id}&globals=theme:${s.theme}&viewMode=story`;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `preview/${s.file}.png`, fullPage: true });
  console.log("shot:", s.file);
}

await browser.close();
