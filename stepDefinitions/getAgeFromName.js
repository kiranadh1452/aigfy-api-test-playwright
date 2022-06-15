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

When(
  "the user sends a request to apify with name {string} and country id {string}",
  async function (customName, countryId) {
    response = await context.get("", {
      params: {
        name: customName,
        country_id: countryId,
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

Then(
  "the response body should contain the name {string} and valid age",
  async function (expectedName) {
    const responseBody = await response.json();

    // checking that the response has the same name which was in the request
    assert.equal(
      expectedName,
      responseBody.name,
      `Expected name ${expectedName} but found ${responseBody.name}`
    );

    // checking that the response has found a valid age
    assert.equal(
      typeof responseBody.age,
      "number",
      `Expected Number but got ${typeof responseBody.age}\n This is because no such data was found that matched the request params`
    );
  }
);

Then(
  "the response body should contain country id {string}",
  async function (countryId) {
    const response_country_id = (await response.json()).country_id;
    assert.equal(
      response_country_id,
      countryId,
      `Expected Response ${countryId} but found ${response_country_id}`
    );
  }
);
