import { test, expect } from "@playwright/test";
import CatalogPage from "../src/CatalogPage";
import LoginPage from "../src/loginPage";
import MenuPage from "../src/MenuPage";

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("https://www.saucedemo.com/");
});

test("Successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm("standard_user", "secret_sauce");
  const catalogPage = new CatalogPage(page);
  await expect(catalogPage.productTitle).toHaveText("Products");
});

test("Successful logout", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm("standard_user", "secret_sauce");
  const catalogPage = new CatalogPage(page);
  await expect(catalogPage.productTitle).toHaveText("Products");
  const menuPage = new MenuPage(page);
  await menuPage.logginOut();
  await expect(loginPage.submitButton).toBeVisible();
});