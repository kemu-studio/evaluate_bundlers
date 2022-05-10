const path = require('path');

module.exports = {
  // mode: 'development',
  entry: {
    indexImport: './src/index.js',
    indexRequire: './src/indexRequire.js',
    indexWrappedRequire: './src/indexWrappedRequire.js',
    indexRequireNodeOrBrowser: './src/indexRequireNodeOrBrowser.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};