module.exports = {
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwindcss')('../../tailwind.config.cjs'),
    require('postcss-import'),
    require('postcss-nesting'),
    require('autoprefixer'),
  ],
  ident: 'postcss',
}
