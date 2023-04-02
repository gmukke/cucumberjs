const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let page;

Before({timeout: 60 * 1000}, async function() {
  browser = await chromium.launch();
  page = await browser.newPage();
});

Given('I am on the Google homepage', async function() {
  await page.goto('https://www.google.com');
});

When('I search for {string}',  async function(query) {
  const searchInput = await page.$('[name="q"]');
  await searchInput.type(query);
  await searchInput.press('Enter');
});

Then('I should see search results for {string}', async function(query) {
  const pageTitle = await page.title();
  if (!pageTitle.includes(query)) {
    throw new Error(`Expected page title to include "${query}", but it was "${pageTitle}"`);
  }
});

After(async function() {
  if (browser) {
    await browser.close();
  }
});
