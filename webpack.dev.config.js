const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/docs/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/docs/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        loader: 'css-loader'
      }
    ]
  },
  devServer: {
    contentBase: ['src/docs'],
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 4000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false
      }
    }
  },
  plugins: [HtmlWebpackPluginConfig,]
}