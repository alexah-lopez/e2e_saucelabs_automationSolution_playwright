/**
 * This class obtains the elements in the DOM for the
 * catalog page using different locators
 */
class CatalogPage {
  /** @param {page=} page */
  constructor(page) {
    this.productTitle = page.getByTestId("title");
  }
}
export default CatalogPage;
