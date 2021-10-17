// @ts-check

module.exports = {
  "package.json": [
    "sort-package-json",
    () => "yarn install --immutable --mode=update-lockfile",
    "prettier --write",
  ],
  "yarn.lock": () => "yarn dedupe --mode=update-lockfile",
  "*.{j,t}s{,x}": ["organize-imports-cli", "eslint --fix", "prettier --write"],
  "*": "prettier --ignore-unknown --write",
}
