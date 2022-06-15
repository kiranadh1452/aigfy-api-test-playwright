const assert = require("assert");
const { When, Then } = require("@cucumber/cucumber");

let response;

When(
  "the user sends a request to apify with name {string}",
  async function (customName) {
    response = await context.get("", {
      params: {
        name: customName,
      },
    });
  }
);

Then("the response code should be {string}", async function (statusCode) {
  assert.equal(
    response.status(),
    statusCode,
    `Expected status code ${statusCode}, but found ${response.status()}`
  );
});

Then("the response body should contain age", async function () {
  const responseBody = await response.json();
  assert.equal(
    typeof responseBody.age,
    "number",
    `Expected Number but got ${typeof responseBody.age}`
  );
});
