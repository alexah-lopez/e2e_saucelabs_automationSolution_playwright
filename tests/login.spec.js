import { test, expect } from '@playwright/test';
import CatalogPage from '../src/CatalogPage';
import LoginPage from '../src/loginPage';


test('Successfull login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  let loginPage = new LoginPage(page);
  await loginPage.submitLoginForm('standard_user','secret_sauce');
  let catalogPage= new CatalogPage(page);
  expect(catalogPage.productTitle).toHaveText('Products')
})


