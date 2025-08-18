/**
 *  @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true },
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
    },
    globals: {
        React: 'readonly',
        JSX: 'readonly',
        Theme: 'readonly'
    },
    settings: {
        react: {
            version: 'detect'
        },
    },
    rules: {
        // general
        'no-alert': 0,
        'no-console': 0,
        'no-unused-vars': 0,
        'no-nested-ternary': 0,
        'prefer-const': 1,
        // typescript
        '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
        // react
        'react/react-in-jsx-scope': 0,
        'react/prop-types': 0,
        'react/jsx-uses-react': 0,
        'react/jsx-uses-vars': 1,
        'react/display-name': 0,
        'react-hooks/rules-of-hooks': 2,
        'react-hooks/exhaustive-deps': 1,
    },
    ignorePatterns: ['dist', 'node_modules', '*.cjs']
};
