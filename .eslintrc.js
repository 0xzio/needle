/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom'],
  rules: {
    'react/display-name': 0,
  },
  settings: {
    next: {
      rootDir: ['apps/web/'],
    },
  },
}
