const path = require("path");

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      "jsx": true
    },
    ecmaVersion: 2018,
    //project: path.resolve(__dirname, "./tsconfig.json"),
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/prop-types": "warn",
    "react/jsx-key": "warn",
    "react/display-name": "off",
    //"react/jsx-indent-props": ["error", "first"],
    'indent': ['off', 2, {
      'CallExpression': {'arguments': 2},
       "SwitchCase": 1 ,

      'ignoredNodes': [
          'CallExpression > CallExpression',
          'CallExpression > MemberExpression'
      ]
    }],

    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "no-useless-escape": "off",
    "no-fallthrough": "off",
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
