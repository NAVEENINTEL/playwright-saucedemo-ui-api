const { test, expect } = require('@playwright/test');
const { fetchRandomImageUrl } = require('../../utils/apiTestUtils');

test.describe('Check for duplicate images from API', () => {
  test('should not receive duplicate images', async () => {
    const imageUrls = [];

    for (let i = 0; i < 3; i++) {
      const response = await fetchRandomImageUrl();

      expect(imageUrls).not.toContain(response);
      imageUrls.push(response);
      console.log(`Received image URL ${i + 1}:`, response);
    }
  });
});




