const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off", // default
    "import/no-extraneous-dependencies": "off", // always cries for not reason
    "@typescript-eslint/explicit-function-return-type": "off", // annyoing
    "@typescript-eslint/no-unsafe-assignment": "off", // fucks with next/image
    "import/named": "off", // todo probably remove this? it messes with useFormState so its turned off for now. afiak ts should be able to catch this too
    "@typescript-eslint/no-misused-promises": "off", // pspstare server actions dont work ....
  },
};
