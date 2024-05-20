// @ts-check

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    languageOptions: { globals: globals.browser },
    settings: { react: { version: 'detect' } },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactRecommended,
  eslintConfigPrettier,
);
