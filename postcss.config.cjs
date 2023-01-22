module.exports = {
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nesting'),
    require('autoprefixer'),
    require('postcss-custom-properties'),
  ],
  ident: 'postcss',
}
