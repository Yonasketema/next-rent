import { Given, When, Then } from "@cucumber/cucumber";
// import request from "supertest";
import { GET } from "../../../app/api/books/route";

import assert from "assert";

Given("user role {string}", async function (role) {
  this.role = role;
});

When("the user tries to retrieve a list of books", async function () {
  const user = {
    role: {
      id: 3,
      name: this.role,
      permissions: [
        {
          type: '{"action":"read","subject":"Book"}',
        },
        {
          type: '{"action":"create","subject":"Rent"}',
        },
      ],
    },
  };

  const request = new Request("http://127.0.0.1:300/api/books", {
    headers: { user: JSON.stringify(user) },
  });

  this.responseBooks = await GET(request);
  this.allBooks = await this.responseBooks.json();
});

Then("the response status {int}", async function (status) {
  assert.equal(this.allBooks.data.status, status);
});
