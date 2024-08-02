import {test, expect} from '@playwright/test';
import CatalogPage from '../src/CatalogPage';
import LoginPage from '../src/loginPage';


test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('https://www.saucedemo.com/');
});

test('Successfull login', async ({ page }) => {
  new LoginPage(page).submitLoginForm('standard_user','secret_sauce');
  //await loginPage.submitLoginForm('standard_user','secret_sauce');
  await expect(new CatalogPage(page).productTitle).toHaveText('Products')
})


