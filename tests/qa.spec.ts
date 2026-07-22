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

test("core scroll film renders SSR narrative + thesis", async ({ page }) => {
  await enter(page);
  const film = page.getByTestId("scroll-film");
  await expect(film).toHaveCount(1);
  await expect(page.getByTestId("film-stage-thesis")).toContainText(
    /intelligence is only meaningful/i
  );
});

test("worker simulation requires human approval before outcome", async ({ page }) => {
  await enter(page);
  const sim = page.getByTestId("worker-sim");
  await sim.scrollIntoViewIfNeeded();
  await page.getByTestId("objective-support").click();
  await page.getByTestId("sim-next").click(); // run policy gate
  await expect(page.getByTestId("sim-log")).toContainText(/human must release|holds risky/i);
  await page.getByTestId("sim-next").click(); // send to human
  // Outcome must NOT be present until a human approves.
  await expect(page.getByTestId("sim-outcome")).toHaveCount(0);
  await page.getByTestId("approve-run").click();
  await page.getByTestId("sim-outcome-next").click();
  await expect(page.getByTestId("sim-outcome")).toBeVisible();
  await expect(page.getByTestId("sim-log")).toContainText(/SAMPLE/);
});

test("decision chamber shows a covenant reading per choice", async ({ page }) => {
  await enter(page);
  const chamber = page.getByTestId("chamber");
  await chamber.scrollIntoViewIfNeeded();
  await page.getByTestId("choice-profit-trust-send").click();
  await expect(page.getByTestId("chamber-verdict")).toContainText(/breach/i);
  await page.getByTestId("choice-profit-trust-gate").click();
  await expect(page.getByTestId("chamber-verdict")).toContainText(/aligned/i);
  await expect(page.getByTestId("chamber-evaluation")).toContainText(/holds the stop/i);
});

test("portfolio world updates when a venture is selected", async ({ page }) => {
  await enter(page);
  const portfolio = page.getByTestId("portfolio");
  await portfolio.scrollIntoViewIfNeeded();
  await page.getByTestId("venture-card-physiops").click();
  await expect(page.getByTestId("world-physiops")).toBeVisible();
  await expect(page.getByTestId("world-physiops")).toContainText(/signal/i);
});

test("founders section shows all three co-founders with roles", async ({ page }) => {
  await enter(page);
  const founders = page.getByTestId("founders");
  await founders.scrollIntoViewIfNeeded();
  await expect(founders).toBeVisible();

  await expect(page.getByTestId("founder-b")).toContainText(/O.Leary/);
  await expect(page.getByTestId("founder-j")).toContainText("Joel Bedard");

  const josh = page.getByTestId("founder-jm");
  await expect(josh).toBeVisible();
  await expect(josh).toContainText("Josh Mellott");
  await expect(josh).toContainText("Co-Founder & Chief Revenue Officer");
  await expect(josh).toContainText(/revenue force/i);

  // Josh is also a covenant signatory.
  const covenant = page.getByTestId("covenant");
  await covenant.scrollIntoViewIfNeeded();
  await expect(covenant).toContainText("Josh Mellott");
});

function overlaps(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number }
) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

test("sound control does not obstruct mobile content; desktop non-overlapping", async ({ page }) => {
  await enter(page);
  const toggle = page.getByTestId("sound-toggle");
  const vw = page.viewportSize()?.width ?? 1440;

  // Bring the Worker Simulation primary controls into view.
  const sim = page.getByTestId("worker-sim");
  await sim.scrollIntoViewIfNeeded();
  const control = page.getByTestId("objective-support");
  await expect(control).toBeVisible();

  if (vw <= 640) {
    // Mobile: no persistent fixed control may sit over the page.
    await expect(toggle).toBeHidden();
  } else {
    // Desktop may retain the fixed control, but it must not cover controls.
    await expect(toggle).toBeVisible();
    const tb = await toggle.boundingBox();
    const cb = await control.boundingBox();
    expect(tb, "sound toggle box").not.toBeNull();
    expect(cb, "control box").not.toBeNull();
    expect(overlaps(tb!, cb!), "sound toggle overlaps sim control").toBe(false);
  }
});

test("no horizontal overflow", async ({ page }) => {
  await enter(page);
  await noHorizontalOverflow(page);
  // scroll through and re-check at the bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await noHorizontalOverflow(page);
});
