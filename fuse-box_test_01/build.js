// https://css-tricks.com/working-with-fusebox-and-react/
const { fusebox } = require('fuse-box')

const fuse = fusebox({
  target: 'browser',
  entry: 'src/index.js',
  webIndex: {
    template: 'index.html',
  },
  devServer: true,
}).runDev()