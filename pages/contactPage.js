class ContactPage {
  constructor(page) {
    this.page = page;
    this.forenameInput = "//input[@id='forename']";
    this.emailInput = "//input[@id='email']";
    this.messageInput = "//textarea[@id='message']";
    this.submitButton = 'text=Submit';
    this.headerMessage = '#header-message';
    this.errorMessages = '.error-message';
    this.successMessage = 'text=Sending feedback';
  }

  async fillForm(forename, email, message) {
    await this.page.locator(this.forenameInput).fill(forename);
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.messageInput).fill(message);
  }

  async clickSubmit() {
    await this.page.locator(this.submitButton).click();
  }

  async areErrorMessagesVisible() {
    const errorCount = await this.page.locator(this.errorMessages).count();
    return errorCount > 0;
  }
}

module.exports = ContactPage;
