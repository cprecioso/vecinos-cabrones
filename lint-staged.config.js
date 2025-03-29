// @ts-check

const prettier = "prettier --ignore-unknown --write";

module.exports = {
  "package.json": [
    "sort-package-json",
    () => "yarn install --mode=update-lockfile",
    prettier,
  ],
  "*.css": ["stylelint --fix", prettier],
  "yarn.lock": () => "yarn dedupe --mode=update-lockfile",
  "*.{j,t}s{,x}": ["eslint --fix", prettier],
  "*": prettier,
};
