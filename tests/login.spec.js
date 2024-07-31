import { test, expect } from '@playwright/test';
import LoginPage from '../src/loginPage';
import Catalog from '../src/CatalogPage';
import exp from 'constants';

test('Successfull login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  let loginPage = new LoginPage(page);
  await loginPage.submitLoginForm('standard_user','secret_sauce');
  let catalog = new Catalog(page);
  expect(catalog.productTitle).toHaveText('Products')
})


