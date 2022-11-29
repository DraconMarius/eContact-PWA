const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      filename: "bundle.js",
      path: path.resolve(__dirname, 'dist'),
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
        title: 'Webpack Plugin',
      }),
      //load css in assets
      new MiniCssExtractPlugin(),
      new GenerateSW(),
      new WebpackPwaManifest({
        name: 'eContactPWA',
        short_nam: 'eContact',
        description: 'installable contact tracking app',
        background_color: '#ffffff',
        theme_color: '#7eb4e2',
        start_url: './',

        icons: [
          {
            src: path.resolve('assets/images/logo.png'),
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
          type: 'asset/resource',
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
