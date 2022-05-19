const webpack = require('webpack');
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
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'IS_BROWSER_FROM_GLOBAL_CONFIG': true
    })
  ],
  optimization: {
    minimize: true,
  },
  module: {
    rules: [{
      use: [
        { loader: "ifdef-loader", options: { IS_BROWSER_FOR_IFDEF: true }}
      ]
    }]
  }
};