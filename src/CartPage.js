class CartPage {
    constructor(page) {
        this.productName = page.getByTestId('inventory-item-name');
        this.productDescription = page.getByTestId('inventory-item-desc');
        this.productPrice = page.getByTestId('inventory-item-price');
        this.numberOfProductsinCart = page.getByTestId('shopping-cart-badge');
        this.checkoutButton = page.getByTestId('checkout');
    }

    /**
     * Get the number of products in the cart
     * @return {Int}  - number of products in the Cart
     */
    async getItemsInCartNumber() {
        return await this.numberOfProductsinCart.innerText();
    }

    async eslintFormat(x, y) {
        let r = x + y;
        let string = 'text';
    }

    /**
     * Get the properties of the product in the cart
     * @return {Array}  - product properties
     * Name, Description and Price
     */
    async getProductInformation() {
        const cartProductInformation = [
            await this.productName.innerText(),
            await this.productDescription.innerText(),
            await this.productPrice.innerText()
        ];
        return cartProductInformation;
    }

    /**
     * Click on the Checkout button
     */
    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}
export default CartPage;
