import { it } from "node:test";

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

  async getPriceListArray(){
    const priceItemsArray = [];
    for(let item of await this.productPrices.all()){
      const price  = await item.innerText();
      const priceFloat = parseFloat(price.replace("$", ""));
      priceItemsArray.push(priceFloat);
    }
    return priceItemsArray;
  }

  async orderArrayAscending(itemsPriceArray){
    var pricceItemOrdered = itemsPriceArray.sort(function (a,b) {
      return a - b; // Ascending
  });;
  return pricceItemOrdered;
  }

  async selectOrderBy(){
    await this.dropdown.selectOption('Price (low to high)');
  }

  async compareArrays(pricesOrdered, pricesOrderByWebPage){
      if(JSON.stringify(pricesOrdered) === JSON.stringify(pricesOrderByWebPage))
        { return true;
        }
        else{
          return false;
        }
  }

  async valdateOrderByPriceLowToHigh(page){
    let priceOrderedArray = await this.getPriceListArray();
    priceOrderedArray = await this.orderArrayAscending(priceOrderedArray);
    await this.selectOrderBy();
    let itemsPriceArray = await this.getPriceListArray();
    return this.compareArrays(itemsPriceArray,priceOrderedArray);
  }

}
export default CatalogPage;
