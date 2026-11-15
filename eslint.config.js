import { defineConfig } from "eslint/config";

import js from "@eslint/js";

import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  // JS recommended configs

  js.configs.recommended,

  // Add custom rules

  // Below are defaults from the docs

  {
    files: ["**/*.js"],

    rules: {
      "no-unused-vars": "warn",

      "no-undef": "warn",
    },
  },

  {
    files: ["finalproject/js/**/*.js"],

    languageOptions: {
      globals: {
        console: "readonly",
        document: "readonly",
        fetch: "readonly",
        URL: "readonly",
      },
    },
  },

  // Prettier config using eslint-config-prettier

  // Do not move, this must be last to override properly

  eslintConfigPrettier,
]);
