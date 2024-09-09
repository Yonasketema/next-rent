const config = {
  paths: ["tests/features/**/*.feature"],
  require: ["tests/features/step-definitions/**/*.ts"],

  requireModule: ["ts-node/register"],
  format: ["summary", "progress-bar"],
  formatOptions: { snippetInterface: "async-await" },
};

module.exports = {
  default: config,
};
