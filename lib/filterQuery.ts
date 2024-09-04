import jsonSchema from "@/data/json-schema.json";
import { Prisma } from "@prisma/client";

interface PrismaQuery {
  [key: string]: string | number | PrismaQuery;
}

export const filterQuery = (
  req: Request,
  model: Prisma.ModelName
): PrismaQuery => {
  const url = new URL(req.url);
  const filters = Object.fromEntries(url.searchParams);

  if (!filters.filters) return {};

  console.log(JSON.parse(filters.filters));

  let queryArray: { id: string; operVal: string; val: string }[] = JSON.parse(
    filters.filters
  );

  const fieldExistsInSchema = (fieldPath: string, val: any): boolean => {
    const keys: string[] = fieldPath.split(".");
    let current: any = jsonSchema.definitions[model];

    if (keys.length === 1 && keys[0] in current.properties) {
      if (typeof val !== current.properties[keys[0]].type.toLocaleLowerCase()) {
        throw new Error(
          `Field ${keys[0]} type does not match the JSON schema.`
        );
      }
      return true;
    }

    for (const key of keys) {
      if (key in current?.properties && keys.indexOf(key) === keys.length - 1) {
        if (typeof val !== current.properties[key].type) {
          throw new Error(`Field ${key} type does not match the JSON schema.`);
        }
        return true;
      }

      if (
        key in current?.properties &&
        jsonSchema.definitions[
          current?.properties[key]["$ref"].split("/").at(-1) as Prisma.ModelName
        ]
      ) {
        current =
          jsonSchema.definitions[
            current?.properties[key]["$ref"]
              .split("/")
              .at(-1) as Prisma.ModelName
          ];
      } else {
        return false;
      }
    }

    return true;
  };

  const prismaQuery: PrismaQuery = queryArray.reduce(
    (acc, { id, operVal, val }) => {
      if (!fieldExistsInSchema(id, val)) {
        throw new Error(`Field ${id} does not exist in the JSON schema.`);
      }

      const keys = id.split(".");
      let current: PrismaQuery = acc;

      keys.forEach((key, index) => {
        if (!current[key]) {
          current[key] = {};
        }
        if (index === keys.length - 1) {
          (current[key] as PrismaQuery)[operVal] = val;
        } else {
          current = current[key] as PrismaQuery;
        }
      });

      return acc;
    },
    {}
  );

  return prismaQuery;
};
