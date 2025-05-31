import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      semi: ["error"],
      quotes: ["error", "double"],
      "typescript-eslint/no-unused-vars": "warn",
      "typescript-eslint/no-explicit-any": "warn",
      "no-console": ["warn"],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "prefer-const": "error",
      "consistent-return": "warn",
      "no-else-return": "warn",
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "no-magic-numbers": ["warn", { ignoreArrayIndexes: true }],
      "no-var": "error",
      "prefer-arrow-callback": "warn",
      "prefer-template": "warn",
      "arrow-body-style": ["warn", "as-needed"],
      "no-plusplus": ["warn", { allowForLoopAfterthoughts: true }],
      "no-multi-assign": "warn",
      "no-new-object": "warn",
      "no-array-constructor": "warn",
      "no-new-wrappers": "warn",
      "no-throw-literal": "error",
      "no-undef": "error",
      "no-unused-expressions": "warn",
      "no-useless-constructor": "warn",
      "no-useless-rename": "warn",
      "no-duplicate-case": "warn",
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-fallthrough": "warn",
      "no-implied-eval": "warn",
      "no-lone-blocks": "warn",
      "no-loop-func": "warn",
      "no-multi-str": "warn",
      "no-new-func": "warn",
      "no-new-symbol": "warn",
      "no-restricted-syntax": [
        "warn",
        "WithStatement",
        "LabeledStatement",
        "BinaryExpression[operator='in']",
        "BinaryExpression[operator='instanceof']",
      ],
      "no-return-assign": ["warn", "except-parens"],
      "no-self-assign": "warn",
      "no-self-compare": "warn",
      "no-sequences": "warn",
      "no-throw-literal": "warn",
      "no-unmodified-loop-condition": "warn",
      "no-unused-labels": "warn",
      "no-useless-escape": "warn",
      "no-void": "warn",
      "prefer-const": "warn",
      "prefer-destructuring": "warn",
      "prefer-exponentiation-operator": "warn",
      "prefer-numeric-literals": "warn",
      "prefer-object-spread": "warn",
      "prefer-regex-literals": "warn",
      "prefer-rest-params": "warn",
      "prefer-spread": "warn",
      "prefer-template": "warn",
      "require-await": "warn",
      "require-yield": "warn",
      "rest-spread-spacing": ["warn", "never"],
      "symbol-description": "warn",
      "template-curly-spacing": ["warn", "never"],
      "yield-star-spacing": ["warn", "both"],
    },
  }),
];

export default eslintConfig;
