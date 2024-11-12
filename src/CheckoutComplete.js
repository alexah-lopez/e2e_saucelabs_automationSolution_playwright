class CheckoutComplete{
    constructor(page){
        this.successText = page.getByTestId("complete-header");
    }

   /**
   * Get and return the success text
   * @return {String}  - Success text
   */
    async getSuccessText(){
        return await this.successText.innerText();
    }
}
export default CheckoutComplete;