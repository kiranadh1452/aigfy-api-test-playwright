const assert = require("assert");
const { When, Then } = require("@cucumber/cucumber");

// This variable would be used to hold the response obtained.
// Hence it is declared here
let response;

When(
  "the user sends a request to apify with name {string}",
  async function (customName) {
    // making a get request with query params and storing the response
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
    // making a get request with query params and storing the response
    response = await context.get("", {
      params: {
        name: customName,
        country_id: countryId,
      },
    });
  }
);

Then("the response code should be {string}", async function (statusCode) {
  // check whether the status code of the response and the desired status code are same
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

    // checking that the response has the same country id which was in the request
    assert.equal(
      response_country_id,
      countryId,
      `Expected Response ${countryId} but found ${response_country_id}`
    );
  }
);
