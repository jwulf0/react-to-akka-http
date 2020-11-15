// production config
const {merge} = require('webpack-merge');
const webpack = require('webpack');
const {resolve} = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    // filename: 'js/bundle.[hash].min.js',
    filename: 'js/bundle.min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/assets',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      COMPILE_TIME_VALUE_IS_PROD: JSON.stringify(true)
    })
  ],
});
