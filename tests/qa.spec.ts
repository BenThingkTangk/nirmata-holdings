import { test, expect, type Page } from "@playwright/test";

async function enter(page: Page) {
  await page.goto("/", { waitUntil: "networkidle" });
  // Dismiss the cinematic boot overlay deterministically.
  const boot = page.getByTestId("boot-overlay");
  await boot.click({ timeout: 5000 }).catch(() => {});
  await expect(boot).toHaveClass(/pointer-events-none/, { timeout: 6000 });
}

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const d = document.documentElement;
    return d.scrollWidth - d.clientWidth;
  });
  expect(overflow, "no horizontal overflow").toBeLessThanOrEqual(1);
}

test("hero + core sections render (SSR visible)", async ({ page }) => {
  await enter(page);
  await expect(page.getByTestId("hero")).toBeVisible();
  for (const id of ["manifesto", "failure-modes", "portfolio", "substrate", "atom", "incubator", "covenant", "founders", "contact"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.getByRole("heading", { name: /too important/i })).toBeVisible();
});

test("failure-mode matrix maps failures to ventures", async ({ page }) => {
  await enter(page);
  const matrix = page.getByTestId("failure-matrix");
  await matrix.scrollIntoViewIfNeeded();
  await expect(matrix).toBeVisible();
  await expect(matrix).toContainText(/Thingk Tangk|ATOM/);
});

test("ATOM GenUI switches verticals deterministically", async ({ page }) => {
  await enter(page);
  const genui = page.getByTestId("atom-genui");
  await genui.scrollIntoViewIfNeeded();
  await expect(genui).toBeVisible();
  await page.getByTestId("atom-tab-health").click();
  await expect(page.getByTestId("atom-panel")).toContainText("PhysioPS Insight");
  await expect(page.getByTestId("atom-panel")).toContainText(/never diagnoses/i);
  await page.getByTestId("atom-tab-trust").click();
  await expect(page.getByTestId("atom-panel")).toContainText("EvidenceOS Sentinel");
});

test("living NirmataOS flow updates detail on select", async ({ page }) => {
  await enter(page);
  const flow = page.getByTestId("nirmata-flow");
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toBeVisible();
  await page.getByTestId("flow-stage-outcome").click();
  await expect(flow).toContainText(/measurable result/i);
});

test("portfolio filter narrows the grid", async ({ page }) => {
  await enter(page);
  const portfolio = page.getByTestId("portfolio");
  await portfolio.scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Health & Performance" }).click();
  await expect(page.getByTestId("venture-card-physiops")).toBeVisible();
});

test("no horizontal overflow", async ({ page }) => {
  await enter(page);
  await noHorizontalOverflow(page);
  // scroll through and re-check at the bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await noHorizontalOverflow(page);
});
