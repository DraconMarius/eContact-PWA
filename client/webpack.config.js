const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { GenerateSW } = require('workbox-webpack-plugin');



module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      cards: './src/js/cards.js'
    },

    // TODO: Add the correct output
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, 'dist'),
      // chunkFilename: '[id].[chunkhash].js'
      publicPath: './'
    },
    // adding hot server realod on client dev server
    devServer: {
      hot: 'only',
    },
    // TODO: Add the correct plugins
    plugins: [
      //load html in dist folder
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'eContact',
      }),
      //load css in assets
      new MiniCssExtractPlugin(),
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        swDest: '../../service-worker.js'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'eContactPWA',
        short_nam: 'eContact',
        description: 'installable contact tracking app',
        background_color: '#ffffff',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',

        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      })
    ],

    // TODO: Add the correct modules
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'assets/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  }
};
