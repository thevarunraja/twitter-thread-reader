module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  globals: {
    chrome: true,
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
  },
};
