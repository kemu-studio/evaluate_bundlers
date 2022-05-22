// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

export default {
  mode: 'production',
  entry: {
    index1: './src/index1.js',
    index2: './src/index2.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    }
  }
}