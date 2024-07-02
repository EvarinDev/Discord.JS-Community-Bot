import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint, { rules } from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/*.js"],
    languageOptions: { sourceType: "commonjs" },
    globals: globals.browser,
    ...pluginJs.configs.recommended
  },
  {
    files: ["src/**/*.{js,mjs,cjs,ts}"],
    languageOptions: { parser: tsParser },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-namespace": "off"
    }
  }
];
