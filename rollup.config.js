import minify from 'rollup-plugin-minify-es';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'lib/router.js',
  output: {
    file: 'index.js',
    format: 'iife',
  },
  plugins: [
    minify(),
    resolve({
      browser: true,
    }),
  ],
};
