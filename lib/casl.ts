import { defineAbility } from "@casl/ability";


  
export const  ability = (user:any) =>
  defineAbility((can) => {
    can("read", "Book");
    can("create", "Rent");

    if (user.role === "OWNER") {
      can("read", "Book");
      can("read:stats", "Book");
      can("read:income", "Book");
      can("update", "Book");
      can("create", "Book");
      can("delete", "Book");
    }
    if (user.role === "ADMIN") {
      can("manage", "all");
    }
  });


