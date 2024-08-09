import { defineAbility } from "@casl/ability";

const a = (user) =>
  defineAbility((can) => {
    can("read", "Book");

    if (user.role === "OWNER") {
      can("update", "Book", { ownerId: user.id });
      can("create", "Book");
      can("delete", "Book", { ownerId: user.id });
    }
    if (user.role === "ADMIN") {
      can("manage", "all");
    }
  });
