/**
 * This class obtains the elements in the DOM for the
 * Login page using different locators
 * and contains the function to perform the login action
 */
class LoginPage {
  constructor(page) {
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.submitButton = page.getByTestId("login-button");
    this.errorLabel = page.getByTestId("error");
  }

  /**
   * Loggining into the saucelabs webpage test.
   * 
   * @param {string} username - Username.
   * @param {string} password - Password.
   */
  async submitLoginForm(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
export default LoginPage;
