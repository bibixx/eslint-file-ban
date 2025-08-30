import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import fileBanPlugin from "./rules/file-ban.plugin.mjs";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      "file-ban": fileBanPlugin,
    },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      // Configure your custom rule here
      "file-ban/file-ban": ["error", ["**/banned.js", "**/banned/*"]],
    },
  },
]);
