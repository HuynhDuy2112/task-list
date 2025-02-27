module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'react-app/jest'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['import', 'prettier', 'unused-imports'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/require-default-props': 'off',
    'no-param-reassign': 'off',
    'jsx-a11y/alt-text': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    // Thêm quy tắc để xử lý import không sử dụng
    'unused-imports/no-unused-imports': 'warn', // Cảnh báo khi có import không sử dụng
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ], // Cảnh báo cho các biến không sử dụng
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  globals: {
    JSX: true,
  },
}
