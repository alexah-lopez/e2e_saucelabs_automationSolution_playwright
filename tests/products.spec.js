import { test, expect } from "@playwright/test";
import CatalogPage from "../src/CatalogPage";
import LoginPage from "../src/LoginPage";
import {testData} from "../src/helpers/enums";

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  await loginPage.submitLoginForm(testData.USERNAME, testData.PASSWORD);
  await expect(catalogPage.productTitle).toHaveText("Products");
});

test("Validate order by price low to high", async ({ page }) => {
  const catalogPage = new CatalogPage(page);
  let priceOrderedList = await catalogPage.getPricesList();
  priceOrderedList = await catalogPage.orderArrayAscending(priceOrderedList);
  await catalogPage.selectOrderBy(testData.ORDER_BY_ASC);
  let itemsPriceList = await catalogPage.getPricesList();
  expect (catalogPage.compareThePriceLists(priceOrderedList,itemsPriceList)).toBe(true);
});

test("Validate order by price high to low", async ({ page }) => {
  const catalogPage = new CatalogPage(page);
  let priceOrderedList = await catalogPage.getPricesList();
  priceOrderedList = await catalogPage.orderArrayDescending(priceOrderedList);
  await catalogPage.selectOrderBy(testData.ORDER_BY_DSC);
  let itemsPriceList = await catalogPage.getPricesList();
  await catalogPage.addRandomProductNumberToCart();
  expect (catalogPage.compareThePriceLists(priceOrderedList,itemsPriceList)).toBe(true);
});