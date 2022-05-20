import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
//  input: 'src/index.js',
  input: 'src/indexRequireNodeOrBrowser.js',
  output: {
    exports: 'auto',
    file: 'bundle.js',
    format: 'iife',
    plugins: [terser()]
  },
  plugins: [
    commonjs(),
    nodeResolve()
  ]
};