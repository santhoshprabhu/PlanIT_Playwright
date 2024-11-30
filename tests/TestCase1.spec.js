const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const ContactPage = require('../pages/contactPage');

test('Validate errors and successful form submission', async ({ page }) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);

  // Step 1: Navigate to the home page
  await page.goto('http://jupiter.cloud.planittesting.com/#/home');
  await expect(page).toHaveTitle(/Jupiter Toys/);
  console.log('Navigation successful and title verified!');

  // Step 2: Go to the Contact page
  await homePage.goToContactPage();

  // Step 3: Submit the form without filling any fields
  await contactPage.clickSubmit();
  await expect(page.locator(contactPage.headerMessage)).toContainText(
    "We welcome your feedback - but we won't get it unless you complete the form correctly."
  );
  console.log('Error messages displayed successfully!');

  // Step 4: Fill in the mandatory fields
  await contactPage.fillForm('Santhosh', 'santhoship@yahoo.com', 'This is a test message.');

  // Step 5: Submit the form
  await contactPage.clickSubmit();

  // Step 6: Verify error messages are cleared
  expect(await contactPage.areErrorMessagesVisible()).toBeFalsy();
  console.log('Errors cleared successfully after submission!');

  // Step 7: Verify success message
  await expect(page.locator(contactPage.successMessage)).toBeVisible();
  console.log('Success message verified!');
});
