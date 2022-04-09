modules.export = {
 extends: '@damilaredev/eslint-config',
 rules: {
  'no-restricted-imports': [
   'error',
   {
    paths: ['path'],
   },
  ],
 },
};
