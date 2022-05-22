import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import consts from 'rollup-plugin-consts';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import jscc from 'rollup-plugin-jscc'

export default {
//  input: 'src/index.js',
  input: 'src/indexRequireNodeOrBrowser.js',
  output: {
    exports: 'auto',
    file: 'bundle.js',
    format: 'iife',
    //format: 'cjs',
    //format: 'es',
    plugins: [terser()]
  },
  plugins: [
    commonjs({
      // Needed to resolve both resolve() and import statements.
      // https://stackoverflow.com/questions/62770883/how-to-include-both-import-and-require-statements-in-the-bundle-using-rollup
      transformMixedEsModules: true
    }),
    replace({
      IS_BROWSER_FROM_REPLACE_PLUGIN: true
    }),
    jscc({
      values: { _IS_BROWSER_FROM_JSCC_PLUGIN: true },
    }),
    // https://github.com/rollup/plugins/tree/master/packages/node-resolve
    // Output imported modules to the bundle.
    nodeResolve({
      // Needed to follow "browser" entry point while resolving import.
      browser: true,
    }),
    // https://www.npmjs.com/package/rollup-plugin-consts
    // Define global constant.
    // Usage: import x from 'consts:x'
    consts({
      IS_BROWSER_FROM_GLOBAL_CONFIG: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
  ]
};