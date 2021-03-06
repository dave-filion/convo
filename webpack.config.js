module.exports = {
  entry: './js/client/index.js',
  output: {
    filename: './public/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
