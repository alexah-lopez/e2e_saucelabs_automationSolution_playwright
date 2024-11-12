class NavBarPage {
    constructor(page) {
      this.cartIcon = page.getByTestId("shopping-cart-link");
    }

     /**
     * Click on the cart icon of the navbar
     */
    async clickCartIcon() {
        await this.cartIcon.click();
      }
}
export default NavBarPage  