const path = require('path')
// const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebPackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/Client/index.html'),
  favicon: './Client/Images/favicon.png',
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
    }, { test: /\.css$/i, use: ['style-loader', 'css-loader'] }, {
      test: /\.(png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot)$/i,
      loader: 'url-loader',
      options: {
        limit: 100000
      }
    }]
  },
  devServer: {
    watchContentBase: true
  },
  output: {
    filename: 'transform.js',
    path: path.join(__dirname, '/Configs/build')
  },
  plugins: [HTMLWebPackPluginConfig]
}
