class LoginPage
{
    constructor(page) {
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.submitButton = page.getByText('Login');
    }

    async submitLoginForm(username,password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();

    }

}
export default LoginPage
