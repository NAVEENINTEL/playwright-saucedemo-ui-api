const {webURL} =require("../config")

class LoginPage {
    constructor(page) {
      this.page = page;
      this.webURL=webURL
    }
  
    async navigateTo() {
      await this.page.goto(this.webURL);
    }
  
    async login(username, password) {
      await this.page.fill('#user-name', username);
      await this.page.fill('#password', password);
      await this.page.click('#login-button');
    }

  }
  
  module.exports = LoginPage;
  