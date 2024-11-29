class CartPage {
  constructor(page) {
    this.page = page;
  }

  // Get the price of a product in the cart
  async getProductPrice(productName) {
    const priceLocator = this.page.locator(`//tr[td[text()='${productName}']]/td[contains(@class, 'Price')]/span`);
    const priceText = await priceLocator.textContent();
    return parseFloat(priceText.replace('$', '').trim());
  }

  // Get the subtotal of a product in the cart
  async getProductSubtotal(productName) {
    const subtotalLocator = this.page.locator(`//tr[td[text()='${productName}']]/td[contains(@class, 'Subtotal')]/span`);
    const subtotalText = await subtotalLocator.textContent();
    return parseFloat(subtotalText.replace('$', '').trim());
  }

  // Get the total amount displayed in the cart
  async getTotal() {
    const totalLocator = this.page.locator('//td[contains(@class, "Total")]/span');
    const totalText = await totalLocator.textContent();
    return parseFloat(totalText.replace('$', '').trim());
  }
}

module.exports = CartPage;
