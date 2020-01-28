const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'js/bundle.[hash].js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss?/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/i,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig
  ]
};