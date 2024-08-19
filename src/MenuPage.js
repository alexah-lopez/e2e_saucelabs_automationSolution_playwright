/**
 * This class obtains the elements in the DOM for the
 * Menu item on any page using different locators
 */
class MenuPage {
    constructor(page) {
      this.menuButton = page.getByText('Open Menu')
      this.logoutOption = page.getByTestId("logout-sidebar-link");
    }
  
    /**
     * Logging out of the saucelabs webpage.
     */
    async logginOut() {
      await this.menuButton.click();
      await this.logoutOption.click();
    }
  }
  export default MenuPage;