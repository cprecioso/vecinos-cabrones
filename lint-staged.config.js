// @ts-check

const prettier = "prettier --ignore-unknown --write";

module.exports = {
  "package.json": [() => "yarn install --mode=update-lockfile", prettier],
  "yarn.lock": () => "yarn dedupe --mode=update-lockfile",
  "*.{j,t}s{,x}": ["eslint --fix", prettier],
  "*": prettier,
};
