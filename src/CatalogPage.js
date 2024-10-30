import Utils from "../src/helpers/Utils"

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

  async addRandomProductNumberToCart(){
      const productNumber = await this.addButton.count();
      const productRandomNumber = Math.floor(Math.random()*productNumber) + 1
      for(let item of productNumber){
        console.log(item);
      }
    }
  
}
export default CatalogPage;
