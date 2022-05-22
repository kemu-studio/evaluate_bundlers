import {terser} from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: {
    // Explicitly defined sources to build.
    'index1': 'src/index1.js',
    'index2': 'src/index2.js',
  },
  output: {
    exports: 'auto',
    dir: 'build',
    format: 'es',
    plugins: [terser()]
  },
  plugins: [
    nodeResolve({
      // Needed to follow "browser" entry point while resolving import.
      browser: true,
    }),
    babel({
      exclude: 'node_modules/**'
    }),
  ]
};