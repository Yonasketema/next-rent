import { AbilityBuilder } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";
import { interpolate } from "./interpolate";
import { User } from "@prisma/client";

export function createAbility(permissions: any, user: any) {
  const { can, build } = new AbilityBuilder(createPrismaAbility);

  permissions.forEach((permission: any) => {
    const { type, name } = permission;
    const { action, subject, conditions } = JSON.parse(type);
    if (conditions) {
      const interpolatedConditions = interpolate(conditions, user);
      can(action, subject, interpolatedConditions);
    } else {
      can(action, subject);
    }
  });

  return build();
}
