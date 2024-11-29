  class ShopPage {
    constructor(page) {
      this.page = page;
    }
  
    // Function to add a product to the cart based on product ID and quantity
    async addProductToCart(productId, quantity) {
      for (let i = 0; i < quantity; i++) {
        const productXPath = `//li[@id='${productId}']//a[@class='btn btn-success'][normalize-space()='Buy']`;
        await this.page.locator(productXPath).click();
      }
    }
  
    // Function to go to the Cart page
    async goToCartPage() {
      await this.page.locator('text=Cart').click(); // Navigate to Cart page
    }
  }
  
  module.exports = ShopPage;
  