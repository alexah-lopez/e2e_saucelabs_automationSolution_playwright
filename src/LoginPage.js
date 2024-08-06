/**
 * This class obtains the elements in the DOM for the
 * Login page using different locators
 * and contains the function to perform the login action
 */
class LoginPage {
  /** @param {page=} page */
  constructor(page) {
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.submitButton = page.getByText("Login");
  }

  /**
   * This method performs the login action, the username and the password
   * are parameters mandatories
   * @param {string} username @param {string} password
   */
  async submitLoginForm(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
export default LoginPage;
