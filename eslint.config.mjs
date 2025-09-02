import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}, {
  files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parser: typescriptParser,
  },
  plugins: {
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
    "@next/next": nextPlugin,
    "@typescript-eslint": typescriptPlugin,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
    ...typescriptPlugin.configs.recommended.rules,
    "react/react-in-jsx-scope": "off",
  },
}];

export default eslintConfig;