const { test, expect } = require('@playwright/test');
const ShopPage = require('../pages/shopPage');
const CartPage = require('../pages/cartPage');

test('Buy Products, Verify Subtotal, Price, and Total in Cart', async ({ page }) => {
  // Create instances of the page objects
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);

  // Step 1: Navigate to the shop page
  await page.goto('https://jupiter.cloud.planittesting.com/#/shop');

  // Add products to the cart
  await shopPage.addProductToCart('product-2', 2);  // Add 2 Stuffed Frogs
  await shopPage.addProductToCart('product-4', 5);  // Add 5 Fluffy Bunnies
  await shopPage.addProductToCart('product-7', 3);  // Add 3 Valentine Bears
  console.log('Products added to cart successfully!');

  // Step 2: Go to the Cart page
  await shopPage.goToCartPage();
  console.log('Navigated to Cart page!');

  // Verify the product prices are visible in the cart
  await expect(page.getByRole('cell', { name: '$10.99' })).toBeVisible(); // Price of Stuffed Frog
  await expect(page.getByRole('cell', { name: '$9.99' })).toBeVisible();  // Price of Fluffy Bunny
  await expect(page.getByRole('cell', { name: '$14.99' })).toBeVisible(); // Price of Valentine Bear
  console.log('product prices are visible in the cart');

  // Verify the quantities and their respective subtotals
  await expect(page.getByRole('row', { name: 'Stuffed Frog $10.99 2 $21.98' }).getByRole('spinbutton')).toHaveValue('2');
  await expect(page.getByRole('row', { name: 'Fluffy Bunny $9.99 5 $49.95' }).getByRole('spinbutton')).toHaveValue('5');
  await expect(page.getByRole('row', { name: 'Valentine Bear $14.99 3 $44.97' }).getByRole('spinbutton')).toHaveValue('3');
  console.log('Verifies the quantities and their respective subtotals');

  // Verify the subtotals 
  await expect(page.getByRole('cell', { name: '$21.98' })).toBeVisible(); // Subtotal for Stuffed Frogs
  await expect(page.getByRole('cell', { name: '$49.95' })).toBeVisible(); // Subtotal for Fluffy Bunnies
  await expect(page.getByRole('cell', { name: '$44.97' })).toBeVisible(); // Subtotal for Valentine Bears
  console.log('Verifies the subtotals');

  // Verify the total price 
  await expect(page.getByText('Total:')).toBeVisible();
  console.log('Subtotals matched total price');

});
