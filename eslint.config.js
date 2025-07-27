//  @ts-check
import { tanstackConfig } from "@tanstack/eslint-config";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import { globalIgnores } from "eslint/config";

export default [
  globalIgnores([".output/*", ".nitro/*", ".tanstack/*"]),
  ...tanstackConfig.filter((config) => config.name !== "tanstack/package-json"),
  {
    ...react.configs.flat.recommended,
    settings: { react: { version: "detect" } },
  },
  react.configs.flat["jsx-runtime"],
  reactCompiler.configs.recommended,
  { rules: { "import/order": "off" } },
];
