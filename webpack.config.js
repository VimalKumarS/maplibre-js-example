const path = require('path');
const htmlplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: [
      './src/index.js',
      './src/index.css'
    ],
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: '/public/',
      filename: 'bundle.js'
    },
    plugins: [ new htmlplugin({template:'./index.html',inject:true} ),new webpack.HotModuleReplacementPlugin()],
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        // contentBase: path.resolve(__dirname, './dist'),
        static: {
            directory: path.join(__dirname, "dist")
          },
        open: true,
        compress: true,
        hot: true,
        port: 8080,
        liveReload: true,
      },
      devtool: 'source-map',
    module: {
      rules: [
        // {
        //     test: /maplibre-gl/,
        //     use: loaders.null(),
        //   },
        {
          test: /\.js$/,
        //   exclude: /node_modules/,
    
            loader: "babel-loader"
          
        },
        {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
          },
      ]
    }
  };