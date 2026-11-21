import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import solid from "eslint-plugin-solid/configs/typescript";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["dist/", "public/", "node_modules/"] },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  { files: ["src/**/*.{ts,tsx}"], ...solid },
  // Build scripts and config files run in Node, not the browser.
  { files: ["scripts/**", "*.config.ts"], languageOptions: { globals: globals.node } },
);
