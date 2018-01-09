import minify from 'rollup-plugin-minify-es';

export default {
  input: 'lib/router.js',
  output: {
    file: 'index.js',
    format: 'iife',
  },
  plugins: [
    minify(),
  ],
};
