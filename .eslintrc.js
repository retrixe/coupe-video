module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'standard-react', 'standard-jsx'],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // React Hooks rules.
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Make TypeScript ESLint less strict.
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    // Allow no-multi-str.
    'no-multi-str': 'off'
  }
}
