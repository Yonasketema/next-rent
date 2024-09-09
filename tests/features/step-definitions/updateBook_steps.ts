import prisma from "../../../lib/prisma";
import { PUT } from "../../../app/api/books/[id]/route";
import { Given, When, Then, defineParameterType } from "@cucumber/cucumber";
import assert from "assert";

defineParameterType({
  name: "boolean",
  regexp: /true|false/,
  transformer: (s) => (s === "true" ? true : false),
});

Given("a request to update a book with id {word}", async function (bookId) {
  this.bookId = bookId;
});

Given("the user with id {word} is authenticated", async function (userId) {
  this.user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });
});

When("the PUT request is sent to the endpoint", async function () {
  const request = new Request("http://127.0.0.1:300/api/books", {
    method: "PUT",
    headers: { user: JSON.stringify(this.user) },
    body: JSON.stringify({
      title: "new Title",
      price: 123,
      status: "AVAILABLE",
    }),
  });

  this.updatedBookResponse = await PUT(request, {
    params: { id: this.bookId },
  });
  this.updatedBook = await this.updatedBookResponse.json();
});

Then("the response should indicate an {boolean}", async function (error) {
  assert.equal(this.updatedBook.data.error, error);
});

Then("the response status should be {int}", async function (status) {
  assert.equal(this.updatedBook.data.status, status);
});
