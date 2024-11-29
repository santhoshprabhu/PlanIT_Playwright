// tests/contactFormTest.js
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const ContactPage = require('../pages/contactPage');

test('Validate errors', async ({ page }) => {
  // Create instances of the page objects
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);

  // Step 1: Navigate to the home page
  await page.goto('http://jupiter.cloud.planittesting.com/#/home');
  await expect(page).toHaveTitle(/Jupiter Toys/); // Assert that the page title is correct
  console.log('Navigation successful and title verified!');

  // Step 2: Go to the Contact page using the HomePage object
  await homePage.goToContactPage();

  // Step 3: Click the Submit button without filling any fields 
  await contactPage.clickSubmit();

  // Step 4: Verify that error messages are displayed
  await expect(page.locator('#header-message')).toContainText("We welcome your feedback - but we won't get it unless you complete the form correctly.");
  console.log('Error messages displayed successfully!');

  // Step 5: Fill in the mandatory fields and submit again
  await contactPage.fillForm('Santhosh', 'santhoship@yahoo.com', 'This is a test message.');

  // Step 6: Click the Submit button 
  await contactPage.clickSubmit();

  // Step 7: Verify that error messages are gone
  const areErrorsGone = await contactPage.areErrorMessagesVisible();
  expect(areErrorsGone).toBeFalsy();  // Ensure that no errors are visible after form submission
  console.log('Errors are cleared successfully after form submission!');
  const successMessageLocator = page.locator('text=Sending feedback');

  // Step 8: Assert that the success message is displayed
  await expect(successMessageLocator).toBeVisible(); 
  console.log('Success message verified!');
});
