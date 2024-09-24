import { test, expect } from "@playwright/test";
import CatalogPage from "../src/CatalogPage";
import LoginPage from "../src/loginPage";
import { CallTracker } from "assert";


test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm("standard_user", "secret_sauce");
  const catalogPage = new CatalogPage(page);
  await expect(catalogPage.productTitle).toHaveText("Products");
});

test("Validate order by", async ({ page }) => {
  const catalogPage = new CatalogPage(page);
  await catalogPage.productos();
  await page.waitForTimeout(2000);
  //await expect(catalogPage.productPrices.nth(0)).toContainText("29.99");
  //console.log(await catalogPage.productPrices.nth(1).innerText());
 // catalogPage.productos()
 catalogPage.orderByAscending();
});
