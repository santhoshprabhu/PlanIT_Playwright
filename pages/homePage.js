// pages/homePage.js
class HomePage {
  constructor(page) {
    this.page = page;
    this.contactLink = page.locator('text=Contact');
    this.shopLink = page.locator('text=Shop');
  }

  async goToContactPage() {
    await this.contactLink.click();
  }

  async goToShopPage() {
    await this.shopLink.click();
  }
}

module.exports = HomePage;
