var webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');
var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/dist');

module.exports = {
  output:{
    publicPath : '/'
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0']
        }
      },
      {
        test:/\.css$/,
        include: SRC_DIR,
        loader: ['style-loader','css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: "file-loader?name=/public/icons/[name].[ext]"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      },
    ]
  },
  devServer: {
    proxy: {
      "/auth/*": {
        "target": "http://localhost:3000"
      },
      "/api/*": {
        "target": "http://localhost:3000"
      },
    },
    historyApiFallback: true
  },
  plugins: [
      new HtmlWebPackPlugin({
      template: `${SRC_DIR}/index.html`,
      filename: "./index.html"
    })
  ]
};
