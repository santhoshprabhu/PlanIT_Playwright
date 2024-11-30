const { test, expect } = require('@playwright/test');
const ShopPage = require('../pages/shopPage');

test('Buy Products, Verify Subtotal, Price, and Total in Cart', async ({ page }) => {
  //product prices and quantities
  const products = [
    { id: 'product-2', name: 'Stuffed Frog', price: 10.99, quantity: 2, expectedSubtotal: 21.98 },
    { id: 'product-4', name: 'Fluffy Bunny', price: 9.99, quantity: 5, expectedSubtotal: 49.95 },
    { id: 'product-7', name: 'Valentine Bear', price: 14.99, quantity: 3, expectedSubtotal: 44.97 }
  ];

  // Expected total (sum of all subtotals)
  const expectedTotal = products.reduce((sum, product) => sum + product.expectedSubtotal, 0);
  const shopPage = new ShopPage(page);

  // Step 1: Navigate to the shop page
  await page.goto('https://jupiter.cloud.planittesting.com/#/shop');

  // Add products to the cart using the hardcoded product list
  for (const product of products) {
    await shopPage.addProductToCart(product.id, product.quantity);
  }
  console.log('Products added to cart successfully!');

  // Step 2: Go to the Cart page
  await shopPage.goToCartPage();
  console.log('Navigated to Cart page!');

  // Step 3: Verify the product prices are visible in the cart
  for (const product of products) {
    await expect(page.getByRole('cell', { name: `$${product.price.toFixed(2)}` })).toBeVisible();
  }
  console.log('Product prices are visible in the cart');

  // Step 4: Verify the quantities and their respective subtotals
  for (const product of products) {
    await expect(page.getByRole('row', { name: `${product.name} $${product.price.toFixed(2)} ${product.quantity} $${product.expectedSubtotal.toFixed(2)}` })
      .getByRole('spinbutton')).toHaveValue(product.quantity.toString());
  }
  console.log('Verified quantities and their respective subtotals');

  // Step 5: Verify the subtotals for each product
  for (const product of products) {
    await expect(page.getByRole('cell', { name: `$${product.expectedSubtotal.toFixed(2)}` })).toBeVisible();
  }
  console.log('Verified subtotals');

  // Step 6: Verify the total price
  const totalText = await page.locator('text=Total:').textContent();
  console.log(`Extracted total text: "${totalText}"`);
  const totalAmount = parseFloat(totalText.replace(/[^\d.-]/g, '').trim()); // Remove non-numeric characters except for decimal and minus
  console.log(`Parsed total amount: ${totalAmount}`);

  // Check if the total is valid and matches the expected total
  if (isNaN(totalAmount)) {
    console.log("Error: The extracted total value is NaN.");
  } else {
    console.log(`Expected Total: $${expectedTotal.toFixed(2)}, Actual Total: $${totalAmount}`);
    await expect(totalAmount).toBeCloseTo(expectedTotal, 2); // Assert that the total matches the sum of the subtotals
    console.log('Subtotals matched total price');
  }
});
