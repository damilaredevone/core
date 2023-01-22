module.exports = {
  extends: '@damilaredev/eslint-config-typescript',
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: ['path'],
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
      },
    ],
    'import/no-duplicates': 'error',
    'import/order': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],
    '@typescript-eslint/indent': 'off',
    indent: 'off',
    'space-before-function-paren': 'off',
  },
}
