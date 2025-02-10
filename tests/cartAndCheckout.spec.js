import { test, expect } from '@playwright/test';
import CatalogPage from '../src/CatalogPage';
import LoginPage from '../src/LoginPage';
import NavBarPage from '../src/NavBarPage';
import CartPage from '../src/CartPage';
import CheckoutYourInformation from '../src/CheckoutYourInformation';
import CheckoutOverview from '../src/CheckoutOverview';
import CheckoutComplete from '../src/CheckoutComplete';

test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    await loginPage.submitLoginForm(process.env.USERNAME, process.env.PASSWORD);
    await expect(catalogPage.productTitle).toHaveText('Products');
});

test('Validate properties of a product added to the cart', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const navBar = new NavBarPage(page);
    const cartPage = new CartPage(page);
    const randomProductNumber = await catalogPage.getRandomProductNumber();
    const productInformation = await catalogPage.addARandomProductToCart(randomProductNumber);
    await navBar.clickCartIcon();
    const cartProductInformation = await cartPage.getProductInformation();
    expect(catalogPage.compareThePriceLists(productInformation, cartProductInformation)).toBe(true);
});

test('Complete purchase', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const navBar = new NavBarPage(page);
    const cartPage = new CartPage(page);
    const checkoutYourInformation = new CheckoutYourInformation(page);
    const checkoutOverview = new CheckoutOverview(page);
    const checkoutComplete = new CheckoutComplete(page);
    const randomProductNumber = await catalogPage.getRandomProductNumber();
    await catalogPage.addRandomProductNumberToCart(randomProductNumber);
    await navBar.clickCartIcon();
    await cartPage.clickCheckoutButton();
    await checkoutYourInformation.fillCheckoutForm(process.env.USERNAME, process.env.PASSWORD, process.env.POSTALCODE);
    await checkoutOverview.clickFinishButton();
    expect(await checkoutComplete.getSuccessText()).toBe('Thank you for your order!');
});
