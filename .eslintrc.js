module.exports = {
  extends: "airbnb-typescript-prettier",
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/prefer-default-export": "off",
    "no-param-reassign": ["error", { props: false }],
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
};
