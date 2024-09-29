import { test, expect } from "@playwright/test";
import CatalogPage from "../src/CatalogPage";
import LoginPage from "../src/loginPage";


test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm("standard_user", "secret_sauce");
  const catalogPage = new CatalogPage(page);
  await expect(catalogPage.productTitle).toHaveText("Products");
});

test("Validate order by price low to high", async ({ page }) => {
  const catalogPage = new CatalogPage(page);
  await expect (await catalogPage.valdateOrderByPriceLowToHigh(page)).toBe(true);
});
