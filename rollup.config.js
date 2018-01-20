import minify from 'rollup-plugin-minify-es';
import commonjs from 'rollup-plugin-commonjs';
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
      jsnext: true,
      main: true,
    }),
    commonjs({
      namedExports: {
        'node_modules/inherits/inherits.js': [ 'inherits' ],
      }
    })
  ],
};
