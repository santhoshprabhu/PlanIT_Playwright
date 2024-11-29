// pages/contactPage.js
class ContactPage {
  constructor(page) {
    this.page = page;
    this.forenameInput = "//input[@id='forename']";    // Forename input field
    this.emailInput = "//input[@id='email']";          // Email input field
    this.messageInput = "//textarea[@id='message']";   // Message textarea
    this.submitButton = 'text=Submit';                  // Submit button
    this.errorMessages = '.error-message';             // Error message locator
    this.successMessage = 'Sending feedback';  // Success message locator
  }

  // Method to fill in the form fields
  async fillForm(forename, email, message) {
    await this.page.locator(this.forenameInput).fill(forename);
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.messageInput).fill(message);
  }

  // Method to click the Submit button
  async clickSubmit() {
    await this.page.click(this.submitButton);
  }

  // Method to get all error messages
  async getErrorMessages() {
    return await this.page.locator(this.errorMessages).allTextContents();
  }

  // Method to check if the success message is visible
  async getSuccessMessage() {
    return await this.page.locator(this.successMessage).textContent();
  }

  // Method to check if error messages are visible
  async areErrorMessagesVisible() {
    const errorCount = await this.page.locator(this.errorMessages).count();
    return errorCount > 0;
  }
}
module.exports = ContactPage;
