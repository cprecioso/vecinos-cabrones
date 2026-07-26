// @ts-check

const prettier = "prettier --ignore-unknown --write";

const lintStagedConfig = {
  "package.json": [() => "yarn install --mode=update-lockfile", prettier],
  "yarn.lock": () => "yarn dedupe --mode=update-lockfile",
  "*.{j,t}s{,x}": ["oxlint --fix", prettier],
  "*": prettier,
};

export default lintStagedConfig;
