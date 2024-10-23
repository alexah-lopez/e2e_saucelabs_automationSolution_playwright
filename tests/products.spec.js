import { test, expect } from "@playwright/test";
import CatalogPage from "../src/CatalogPage";
import LoginPage from "../src/loginPage";

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  await loginPage.submitLoginForm("standard_user", "secret_sauce");
  await expect(catalogPage.productTitle).toHaveText("Products");
});

test("Validate order by price low to high", async ({ page }) => {
  const catalogPage = new CatalogPage(page);
  let priceOrderedList = await catalogPage.getPricesList();
  priceOrderedList = await catalogPage.orderArrayAscending(priceOrderedList);
  await catalogPage.selectOrderBy("lohi");
  let itemsPriceList = await catalogPage.getPricesList();
  expect (catalogPage.compareThePriceLists(priceOrderedList,itemsPriceList)).toBe(true);
});
