const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      "/appmetrics-dash": "http://localhost:3100",
      "/health": "http://localhost:3100",
      "/test": "http://localhost:3100",
      "/articles": "http://localhost:3100",
      "/project": "http://localhost:3100",
      "/internalnews": "http://localhost:3100",
      "/competition": "http://localhost:3100",
      "/complains": "http://localhost:3100",
      "/lawsborders": "http://localhost:3100",
      "/globalsearch": "http://localhost:3100",
      "/offices": "http://localhost:3100",
    }
  }
});