// tests/contactFormTest.js
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const ContactPage = require('../pages/contactPage');

test('Navigate to Contact Page, Populate Fields, Click Submit, and Validate Success Message', async ({ page }) => {
  // Create instances of the page objects
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);

  // Step 1: Navigate to the home page
  await page.goto('http://jupiter.cloud.planittesting.com/#/home');
  await expect(page).toHaveTitle(/Jupiter Toys/);  // Assert that the page title is correct
  console.log('Navigation successful and title verified!');

  // Step 2: Go to the Contact page 
  await homePage.goToContactPage();
  
  // Step 3: Fill in the mandatory fields and submit again
  await contactPage.fillForm('Santhosh', 'santhoship@yahoo.com', 'This is a test message.');
  
  // Step 4: Click the Submit button
  await contactPage.clickSubmit();
  
  // Step 5: Verify the success message appears on the page
  const successMessageLocator = page.locator('text=Sending feedback');
  await expect(successMessageLocator).toBeVisible();  // Assert the success message is visible
  console.log('Success message verified!');
});
