export default {
  optimize: {
    entrypoints: ['src/indexRequireNodeOrBrowser.js'],
    bundle: true,
    minify: true,
    splitting: false,
    treeshake: true,
    target: 'es2018',
  },
};
