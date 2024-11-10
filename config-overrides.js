const path = require('path');
const {
  override,
  addWebpackAlias,
  addPostcssPlugins,
} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@ui': path.resolve(__dirname, 'src/components/ui'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@lib': path.resolve(__dirname, 'src/lib'),
    '@utils': path.resolve(__dirname, 'src/lib/utils.ts'),
  }),
  addPostcssPlugins([require('tailwindcss'), require('autoprefixer')])
);
