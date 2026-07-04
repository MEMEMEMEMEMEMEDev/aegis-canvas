import { chromium } from "playwright";

const base = "http://localhost:6077/iframe.html";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1100, height: 720 },
  deviceScaleFactor: 1.25,
});

// The "trapped parent" demo — capture both the box and the escaped modal.
const url = `${base}?id=components-modal--escapes-trapped-parent&globals=theme:dark&viewMode=story`;
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.screenshot({ path: "preview/sb-modal-trapped-box.png" });

// Click the Portal button → modal escapes to full viewport.
await page.getByText("Modal con Portal").click();
await page.waitForTimeout(600);
await page.screenshot({ path: "preview/sb-modal-portal-escaped.png" });

await browser.close();
console.log("ok");
