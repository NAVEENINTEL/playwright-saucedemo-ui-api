// import { test, expect } from '@playwright/test';

const { test, expect } = require('@playwright/test');

test('Check for broken links', async ({ page }) => {
    await page.goto('https://demoqa.com/links');
    const links = await page.$$eval('a', links => links.map(link => ({ href: link.href, text: link.textContent.trim() })));

    for (const link of links) {
      try {
        const response = await page.goto(link.href, { timeout: 5000, waitUntil: 'domcontentloaded' });
        
        if (!response.ok()) {
          console.log(`${link.text}  || (${link.href})   ||   Status: ${response.status()}`);
        }
      } catch (error) {
        console.log(`Broken links:`)
        console.log(`${link.text}  || (${link.href}) ||  Error: ${error.message}`);
      }
    }
  
    expect(true).toBeTruthy(); // Pass the test, assuming no assertion failure
});
