import prisma from "../../../lib/prisma";
import { POST } from "../../../app/api/books/route";
import { Given, When, Then, defineParameterType } from "@cucumber/cucumber";
import assert from "assert";

Given(
  "a request to create a book with a user id {word}",
  async function (userId) {
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
  }
);

When("the POST request is sent to the endpoint", async function () {
  const request = new Request("http://127.0.0.1:300/api/books", {
    method: "PUT",
    headers: { user: JSON.stringify(this.user) },
    body: JSON.stringify({
      title: "new Title",
      status: "AVAILABLE",
      author: "yonask",
      categoryId: "cm0kvyvqa000kivgchikp51nh", //Fiction
      price: 123,
      quantity: 4,
    }),
  });

  this.updatedBookResponse = await POST(request);
  this.updatedBook = await this.updatedBookResponse.json();
});

Then(
  "the response should indicate an {boolean} createBook",
  async function (error) {
    assert.equal(this.updatedBook.data.error, error);
  }
);

Then("the response status should be {int} createBook", async function (status) {
  assert.equal(this.updatedBook.data.status, status);
});
