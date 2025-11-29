// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config(
  // Global ignores
  {
    ignores: ['dist', 'node_modules'],
  },

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,

      // TypeScript configs (pick one set)
      ...tseslint.configs.recommendedTypeChecked,
      // OR stricter:
      // ...tseslint.configs.strictTypeChecked,
      // Optional stylistic:
      // ...tseslint.configs.stylisticTypeChecked,

      // React rules
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,

      // Prettier integration
      'plugin:prettier/recommended',
    ],

    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      prettier,
    },

    rules: {
      // Prettier errors in ESLint
      'prettier/prettier': 'error',

      // Example overrides:
      'react-x/no-array-index-key': 'warn',
      'react-dom/no-dangerously-set-innerhtml': 'warn',
    },
  }
);
