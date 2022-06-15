const { chromium } = require("playwright");
const { request, expect } = require("@playwright/test");
const { BeforeAll, setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(1000 * 1000);

BeforeAll(async function () {
  const context = await request.newContext({
    baseURL: "https://api.agify.io",
  });

  global.context = context;
});
