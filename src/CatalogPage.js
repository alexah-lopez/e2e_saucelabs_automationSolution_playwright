import Utils from "../src/helpers/Utils"

/**
 * This class obtains the elements in the DOM for the
 * catalog page using different locators
 */
class CatalogPage {
  constructor(page) {
    this.productTitle = page.getByTestId("title");
    this.productPrices = page.getByTestId("inventory-item-price");
    this.dropdown = page.locator("//select[@data-test='product-sort-container']");
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
   * into an array
   * @return {Array} - priceItemOrdered
   */
  async orderArrayAscending(itemsPriceList){
    let orderedList = itemsPriceList.sort(function (a,b) {
      return a - b; // Ascending
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
      await this.dropdown.selectOption('Price (low to high)');
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
}
export default CatalogPage;
