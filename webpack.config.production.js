var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './main.js',
  ],
  output: {
    path: path.join(__dirname, 'public/scripts'),
    filename: 'example.js',
    publicPath: '/public/scripts/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify("production"),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
              presets: ['es2015', 'react'],
            },
    },
  ],
  },
};
