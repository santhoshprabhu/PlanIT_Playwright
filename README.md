project:
  name: PlanIT Playwright Project
  description: >
    This project is a Playwright-based test automation suite designed for end-to-end testing of web applications.
    It includes modular Page Object Models, reusable utilities, and configurable test scripts.

contents:
  - pages: Contains page object models for the application.
  - tests: Includes test scripts for various user flows.
  - utils: Reusable utility functions and helpers.
  - config: Playwright configuration files.
  - dependencies: Node.js package.json for managing required libraries.

setup:
  prerequisites:
    - Node.js (v16 or higher)
    - Playwright
    - A modern web browser (Chrome, Firefox, or Edge)

  steps:
    - step: "Install project dependencies"
      command: |
        npm install
    - step: "Run the Playwright tests"
      command: |
        npx playwright test
    - step: "View the HTML test report"
      command: |
        npx playwright show-report

structure:
  root:
    - README.md: Documentation for the project.
    - playwright.config.js: Playwright configuration file.
    - pages/: Directory containing page object models.
    - tests/: Directory containing test scripts.
    - utils/: Directory containing utility files.
    - package.json: Project dependencies and npm scripts.

contact:
  maintainer:
    name: Santhosh Prabhu
    email: santhoship@yahoo.com


RESULTS:

Running 3 tests using 1 worker
[chromium] › TestCase1.spec.js:5:1 › Validate errors and successful form submission
Navigation successful and title verified!
Error messages displayed successfully!
Errors cleared successfully after submission!
Success message verified!

[2/3] [chromium] › Testcase2.spec.js:6:1 › Navigate to Contact Page, Populate Fields, Click
[chromium] › Testcase2.spec.js:6:1 › Navigate to Contact Page, Populate Fields, Click Submit, and Validate Success Message
Navigation successful and title verified!
Success message verified!

[3/3] [chromium] › TestCase3.spec.js:4:1 › Buy Products, Verify Subtotal, Price, and Total 
[chromium] › TestCase3.spec.js:4:1 › Buy Products, Verify Subtotal, Price, and Total in Cart
Products added to cart successfully!
Navigated to Cart page!
Product prices are visible in the cart
Verified quantities and their respective subtotals
Verified subtotals
Extracted total text: "Total: 116.9"
Parsed total amount: 116.9
Expected Total: $116.90, Actual Total: $116.9
Subtotals matched total price
  3 passed (9.1s)

