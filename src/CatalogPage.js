import Utils from "./helpers/utils";
/**
 * This class obtains the elements in the DOM for the
 * catalog page using different locators
 */
class CatalogPage {
  constructor(page) {
    this.productTitle = page.getByTestId("title");
    this.productPrices = page.getByTestId("inventory-item-price");
    this.orderByDropDown = page.locator("//select[@data-test='product-sort-container']");
    this.addButton = page.locator("//button[text()='Add to cart']");
    this.productName = page.getByTestId("inventory-item-name");
    this.productDescription = page.getByTestId("inventory-item-desc");
    this.productPrice = page.getByTestId("inventory-item-price");
  }

   /**
   * Obtaining the price for all the products and adding them 
   * into an array, removing the $ symbol and converting the data 
   * to float values
   * @return {Array} - priceItemsArray
   */
  async getPricesList(){
    const priceItemsList = [];
    for(let item of await this.productPrices.all()){
      const price  = await item.innerText();
      const priceFloat = parseFloat(price.replace("$", ""));
      priceItemsList.push(priceFloat);
    }
    return priceItemsList;
  }

 /**
   * Order by ascending the price list 
   * @return {Array} - priceItemOrdered
   */
  async orderArrayAscending(itemsPriceList){
    let orderedList = itemsPriceList.sort(function (a,b) {
      return a - b; // Ascending
  });
  return orderedList;
  }

   /**
   * Order by descending the price list 
   * @return {Array} - priceItemOrdered
   */
   async orderArrayDescending(itemsPriceList){
    let orderedList = itemsPriceList.sort(function (a,b) {
      return b - a; // Descending
  });
  return orderedList;
  }

 /**
   * Select order by option in the DOM
   * @param {String} orderByoption - Order by option value
   */
  async selectOrderBy(orderByoption){
    switch(orderByoption)
    {
     case "lohi":
      await this.orderByDropDown.selectOption('Price (low to high)');
      break;

     case "hilo":
      await this.orderByDropDown.selectOption('Price (high to low)');
      break;
    }
  }

 /**
   * Comparing two price lists.
   * @param {Array} priceList1 - Current price list
   * @param {Array} priceList2 - Price list ordered
   * @return {Boolean}  - result of comparison
   */
  compareThePriceLists(priceList1 , priceList2){
    const utils = new Utils();
    return utils.compareTwoArrays(priceList1,priceList2);
  }

   /**
   * Add random number of products to the cart
   * by clicking on Add to cart button
   * @param {Int} productRandomNumber - Number of products to add
   */
  async addRandomProductNumberToCart(productRandomNumber){
      for(var item = productRandomNumber-1; item >= 0; item --){
        await this.addButton.nth(item).click();
      }
    }

     /**
   * Get a random number from 0 to the total number of product 
   * displayed in the catalog
   * @return {Int}  - Random number generated
   */
    async getRandomProductNumber(){
      const productsTotal = await this.addButton.count();
      const utils = new Utils();
      return utils.generateARandomNumber(productsTotal);
    }

  /**
   * Add one random product to the cart
   * by clicking on Add to cart button
   * @param {Int} productRandomNumber - Product random number
   * @return {Array}  - Product properties 
   * Name, Description and Price
   */
  async addARandomProductToCart(productRandomNumber){
    const itemProperties = [
      await this.productName.nth(productRandomNumber).innerText(),
      await this.productDescription.nth(productRandomNumber).innerText(),
      await this.productPrice.nth(productRandomNumber).innerText()
    ] 
    await this.addButton.nth(productRandomNumber).click();
    return itemProperties;
  }
  
}
export default CatalogPage;
