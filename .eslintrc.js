module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended"
  ],
  env: {
    browser: true
  },
  settings: {
    react: {
      version: "17.0.1",
    }
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 'off',
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-floating-promises": 0,

    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/unbound-method": 0
  },
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": 0
      }
    }
  ]
};
