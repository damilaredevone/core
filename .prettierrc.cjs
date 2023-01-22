module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  tabWidth: 2,
  overrides: [
    {
      files: ['*.yml'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: '**/package.json',
      options: {
        useTabs: false,
        tabWidth: 2,
      },
    },
  ],
}
