const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const CartPage = require('../../pages/CartPage');
const userDetails = require('../../testData/userDetails');
const shippingDetails = require('../../testData/shippingDetails');

for (let i = 0; i < Math.min(userDetails.length, shippingDetails.length); i++) {
  const userData = userDetails[i];
  const shippingData = shippingDetails[i];

  test('Verify final price accuracy at checkout and Thank You page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    const { username, password } = userData;
    const { firstName, lastName, postalCode } = shippingData;


    // Navigate to the website and login
    await loginPage.navigateTo();
    await loginPage.login(username, password);

    // Sort products and add items to cart
    await productsPage.sortByPriceLowToHigh();
    const leastExpensiveItemName = await productsPage.getLeastExpensiveItemName();
    await productsPage.addToCart(leastExpensiveItemName);

    await productsPage.sortByAlphabeticalOrder();
    const firstAlphabeticalItemName = await productsPage.getFirstAlphabeticalItemName();
    await productsPage.addToCart(firstAlphabeticalItemName);

    // Go to the cart
    await cartPage.goToCart();

    // Log the names and prices of added items
    const addedItems = await cartPage.getAddedItemsDetails();
    console.log('Added items:');
    addedItems.forEach((item) => {
      console.log(`Name: ${item.name}, Price: ${item.price}`);
    });

    // Calculate subtotal
    const subtotal = await cartPage.calculateSubtotal();

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Fill shipping details
    await cartPage.fillShippingDetails(firstName, lastName, postalCode);

    // Verify the total price
    const actualTotal = await cartPage.getTotalPrice();
    const expectedTotal = (subtotal * 1.08).toFixed(2);
    expect(actualTotal).toBe(expectedTotal);
    console.log("Final price:")
    console.log(`Expected price: ${expectedTotal} || Actual Price: ${actualTotal}`);

    // Complete checkout and verify Thank You page
    await cartPage.completeCheckout();
    await cartPage.verifyThankYouPage();
    const message = await cartPage.verifyThankYouPage();
    expect(message).toContain('Thank you for your order!');
  });
}