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
   * @return {!Array<TYPE>} - priceItemsArray
   */
  async getPricesList(){
    const priceItemsArray = [];
    for(let item of await this.productPrices.all()){
      const price  = await item.innerText();
      const priceFloat = parseFloat(price.replace("$", ""));
      priceItemsArray.push(priceFloat);
    }
    return priceItemsArray;
  }

 /**
   * Order by ascending the price list 
   * into an array
   * @return {!Array<TYPE>} - priceItemOrdered
   */
  async orderArrayAscending(itemsPriceArray){
    let orderedList = itemsPriceArray.sort(function (a,b) {
      return a - b; // Ascending
  });
  return orderedList;
  }

 /**
   * Select order by option in the DOM
   */
  async selectOrderBy(orderByoption){
    switch(orderByoption)
    {
     case "lohi":
      await this.dropdown.selectOption('Price (low to high)');
      break;
    }
    
  }
}
export default CatalogPage;
