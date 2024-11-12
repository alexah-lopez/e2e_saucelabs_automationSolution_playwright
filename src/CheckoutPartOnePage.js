class CheckoutPartOne{
    constructor(page){
        this.firstName = page.getByTestId("firstName");
        this.lastName = page.getByTestId("lastName");
        this.postalCode = page.getByTestId("postalCode");
        this.continueButton = page.getByTestId("continue");
    }

   /**
   * Fill checkout form and submit
   * @param {string} firstName - First Name
   * @param {string} lastName - Last Name
   * @param {int} postalCode - Postal Code
   */
    async fillCheckoutForm(firstName, lastName, postalCode){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
        await this.continueButton.click();
    }


}
export default CheckoutPartOne;