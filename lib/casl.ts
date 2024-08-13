import { defineAbility } from "@casl/ability";

export const ability = (user: any) =>
  defineAbility((can) => {
    can("read", "Book");
    can("create", "Rent");
    can(
      "request-approval",
      "User",
    )

    if (user.role === "OWNER") {
      can("read:stats", "Book");
      can("read:income", "Book");
      can("update", "Book", { ownerId: user.id });
      can("create", "Book");
      can("delete", "User", { id: user.id });
      can("delete", "Book");
    }
    if (user.role === "ADMIN") {
      can("manage", "all");
    }
  });
