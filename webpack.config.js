const path = require('path')
// const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebPackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/Client/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: path.join(__dirname, '/Client/index.js'),
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, { test: /\.css$/, use: 'css-loader' }]
  },
  output: {
    filename: 'transform.js',
    path: path.join(__dirname, '/Configs/build')
  },
  plugins: [HTMLWebPackPluginConfig]
}
