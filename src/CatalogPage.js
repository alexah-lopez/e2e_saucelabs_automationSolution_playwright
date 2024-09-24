import { it } from "node:test";

/**
 * This class obtains the elements in the DOM for the
 * catalog page using different locators
 */
class CatalogPage {
  constructor(page) {
    this.productTitle = page.getByTestId("title");
    this.productPrices = page.getByTestId("inventory-item-price");
    this.orderByLocator = page.getByTestId("product-sort-container");
    this.orderByAscendentOptionLocator = page.getByRole('option', { name: 'Price (low to high)' });
  }

  async productos(){
    const priceItemsArray = [];
    for(let item of await this.productPrices.all()){
      const price  = await item.innerText();
      const priceFloat = parseFloat(price.replace("$", ""));
      priceItemsArray.push(priceFloat);
    }
    console.log(priceItemsArray);
    this.orderArray(priceItemsArray);
  }

  async orderArray(itemsPriceArray){
    var pricceItemOrdered = itemsPriceArray.sort(function (a,b) {
      return a - b; // Ascending
  });;
    console.log(pricceItemOrdered);

  }

  async orderByAscending(){
    await this.orderByLocator.click();
    //await this.orderByLocator.selectOption({value: 'lohi'}).click();
    await this.orderByAscendentOptionLocator.waitFor(); 
  }

}
export default CatalogPage;
