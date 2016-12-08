const ExtractText = require('extract-text-webpack-plugin')
const extractCSS = new ExtractText('styles.css')

const HTMLWebpack = require('html-webpack-plugin')
const htmlWebpackPlugin = new HTMLWebpack({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {

  entry: [
    './src/index.jsx'
  ],

  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.(jsx)$/i,
    //     include: './src',
    //     loader: 'standard'
    //   }
    // ],
    loaders: [
      {
        test: /\.(js|jsx)$/i,
        exclude: '/(node_modules|bower_components)/',
        loader: 'babel'
      },
      {
        test: /\.(scss)$/i,
        loader: extractCSS.extract('css!sass')
      }
    ]
  },

  plugins: [ 
    htmlWebpackPlugin, 
    extractCSS
  ]
}