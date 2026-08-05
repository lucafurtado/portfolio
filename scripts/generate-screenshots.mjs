/**
 * Regenerates every project screenshot under public/projects/.
 *
 * Dev-only tooling — playwright/sharp are devDependencies, never shipped.
 * Run with: node scripts/generate-screenshots.mjs
 *
 * Requirements before running:
 *  - InDesigns build served locally, e.g.:
 *      npx serve -l 5055 "../../../../01_Clients/Indesigns/06_website/build"
 *  - Network access to the two live Cloudflare Pages deployments.
 *  - Licittare CRM source present at the hardcoded LICITTARE_HTML path below.
 *    Its screenshots use the app's own built-in seedSampleData() fallback —
 *    all requests to the real Supabase project are intercepted and mocked
 *    (see mockLicittareSupabase below) so no real production data is ever
 *    fetched, and the mocked "insert" is never actually sent to production.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT = "public/projects";
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const INDESIGNS_URL = "http://localhost:5055";
const LICITTARE_HTML =
  "file:///C:/Users/User/Desktop/LucaOS/cria-ai/01_Clients/Licittare/Sistema%20de%20vendas/index.html";

async function gradualScroll(page, steps = 16, pause = 130) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 1; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), (height / steps) * i);
    await page.waitForTimeout(pause);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

async function scrollToText(page, text) {
  const y = await page.evaluate((needle) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.trim().toUpperCase() === needle.toUpperCase()) {
        return node.parentElement.getBoundingClientRect().top + window.scrollY;
      }
    }
    return null;
  }, text);
  if (y !== null) await page.evaluate((yy) => window.scrollTo(0, yy - 90), y);
}

function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

/** Intercepts every call to the real Supabase project so no production
 * data is ever fetched, and the seed-data insert never reaches production. */
async function mockLicittareSupabase(page) {
  await page.route("**/ivdfmqdnvcnsekhduxgf.supabase.co/**", async (route) => {
    const req = route.request();
    const url = req.url();
    if (req.method() === "GET" && url.includes("/rest/v1/contacts")) {
      return route.fulfill({ status: 200, contentType: "application/json", body: "[]" });
    }
    if (req.method() === "POST" && url.includes("/rest/v1/contacts")) {
      let rows = [];
      try { rows = JSON.parse(req.postData() || "[]"); } catch { /* ignore */ }
      const now = new Date().toISOString();
      const withIds = rows.map((r, i) => ({ id: 1000 + i, created_at: now, source: "manual", ...r }));
      return route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify(withIds) });
    }
    return route.fulfill({ status: 200, contentType: "application/json", body: "[]" });
  });
}

const browser = await chromium.launch();

async function withPage(viewport, fn) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  try { await fn(page); } finally { await context.close(); }
}

async function shootRaw(page, outPath) {
  ensureDir(outPath);
  await page.screenshot({ path: outPath });
}

// --- InDesigns (local static build; requires local server, see header) ---
await withPage(DESKTOP, async (page) => {
  await page.goto(INDESIGNS_URL + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await shootRaw(page, `${OUT}/indesigns/_raw-desktop-home.png`);

  await page.goto(INDESIGNS_URL + "/clinica-orbis/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await shootRaw(page, `${OUT}/indesigns/_raw-desktop-detail.png`);
});
await withPage(MOBILE, async (page) => {
  await page.goto(INDESIGNS_URL + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await shootRaw(page, `${OUT}/indesigns/_raw-mobile-home.png`);
});

// --- Danielle Cunha (live) — do NOT force reduced-motion, it hides the hero image ---
await withPage(DESKTOP, async (page) => {
  await page.goto("https://danielle-cunha-berna.pages.dev", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await shootRaw(page, `${OUT}/danielle-cunha/_raw-desktop-home.png`);
  await gradualScroll(page);
  await scrollToText(page, "A MÉDICA");
  await page.waitForTimeout(500);
  await shootRaw(page, `${OUT}/danielle-cunha/_raw-desktop-detail.png`);
});
await withPage(MOBILE, async (page) => {
  await page.goto("https://danielle-cunha-berna.pages.dev", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await shootRaw(page, `${OUT}/danielle-cunha/_raw-mobile-home.png`);
});

// --- GMM Engenharia (live) ---
await withPage(DESKTOP, async (page) => {
  await page.goto("https://gmm-engenharia-berna.pages.dev", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await shootRaw(page, `${OUT}/gmm-engenharia/_raw-desktop-home.png`);
  await gradualScroll(page);
  await scrollToText(page, "O QUE FAZEMOS");
  await page.waitForTimeout(500);
  await shootRaw(page, `${OUT}/gmm-engenharia/_raw-desktop-detail.png`);
});
await withPage(MOBILE, async (page) => {
  await page.goto("https://gmm-engenharia-berna.pages.dev", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await shootRaw(page, `${OUT}/gmm-engenharia/_raw-mobile-home.png`);
});

// --- Licittare CRM (local file, fully mocked network — see mockLicittareSupabase) ---
await withPage(DESKTOP, async (page) => {
  await mockLicittareSupabase(page);
  await page.goto(LICITTARE_HTML, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.click('button[data-view="pipeline"]');
  await page.waitForTimeout(800);
  await shootRaw(page, `${OUT}/licittare-crm/_raw-dashboard.png`);
  await page.click('button[data-view="analytics"]');
  await page.waitForTimeout(800);
  await shootRaw(page, `${OUT}/licittare-crm/_raw-analytics.png`);
});

await browser.close();

// --- Optimize: crop where needed + convert to webp, then delete raw files ---
const jobs = [
  { in: "indesigns/_raw-desktop-home.png", out: "indesigns/desktop-home.webp" },
  { in: "indesigns/_raw-desktop-detail.png", out: "indesigns/desktop-detail.webp" },
  { in: "indesigns/_raw-mobile-home.png", out: "indesigns/mobile-home.webp" },
  { in: "danielle-cunha/_raw-desktop-home.png", out: "danielle-cunha/desktop-home.webp" },
  { in: "danielle-cunha/_raw-desktop-detail.png", out: "danielle-cunha/desktop-detail.webp" },
  { in: "danielle-cunha/_raw-mobile-home.png", out: "danielle-cunha/mobile-home.webp" },
  { in: "gmm-engenharia/_raw-desktop-home.png", out: "gmm-engenharia/desktop-home.webp" },
  { in: "gmm-engenharia/_raw-desktop-detail.png", out: "gmm-engenharia/desktop-detail.webp" },
  { in: "gmm-engenharia/_raw-mobile-home.png", out: "gmm-engenharia/mobile-home.webp" },
  { in: "licittare-crm/_raw-dashboard.png", out: "licittare-crm/dashboard.webp", crop: { width: 1440, height: 460 } },
  { in: "licittare-crm/_raw-analytics.png", out: "licittare-crm/analytics.webp", crop: { width: 1440, height: 770 } },
];

for (const job of jobs) {
  const inPath = path.join(OUT, job.in);
  const outPath = path.join(OUT, job.out);
  let pipeline = sharp(inPath);
  if (job.crop) pipeline = pipeline.extract({ left: 0, top: 0, ...job.crop });
  await pipeline.webp({ quality: 82 }).toFile(outPath);
  fs.unlinkSync(inPath);
  console.log("optimized", job.out);
}

console.log("done");
