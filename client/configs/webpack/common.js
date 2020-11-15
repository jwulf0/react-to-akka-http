// shared config (dev and prod)
const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      {
        test: /\.(scss|sass)$/,
        rules: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'sass-loader' }
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        rules: [
          { 
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'gex',
              name: 'img/[hash].[ext]'
            }
          },
          { 
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // TODO shouldn't we rather use disable: true in dev.js?
              optipng: { optimizationLevel: 7 },
              gifsicle: { interlaced: false }
            } 
          },
        ],
      },
    ],
  },
  output: {
    publicPath: '/'
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({template: 'index.html.ejs',}),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  performance: {
    hints: false,
  },
};
