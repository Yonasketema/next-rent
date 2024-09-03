import Mustache from "mustache";

export function interpolate(jsonTemplate: object, context: object) {
  const templateString = JSON.stringify(jsonTemplate);

  const renderedTemplate = Mustache.render(templateString, context);

  const updatedTemplate = JSON.parse(renderedTemplate);

  return updatedTemplate;
}
