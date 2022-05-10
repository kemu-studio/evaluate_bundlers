import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

export default {
//  input: 'src/index.js',
  input: 'src/indexRequire.js',
  output: {
    exports: 'auto',
    file: 'bundle.js',
    format: 'iife',
    plugins: [terser()]
  },
  plugins: [commonjs()]
};