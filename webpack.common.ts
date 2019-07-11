/**
 * Common webpack configuration
 */

import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as path from 'path'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import * as webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
const devMode = process.env.NODE_ENV !== 'production'

const fileLoader = {
  loader: 'file-loader',
  options: {
    name: '[path][name].[hash].[ext]',
    // outputPath: "/",
  },
}

const common: webpack.Configuration = {
  entry: './entrypoint.js',
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, path.join('dist', 'dev')),
  },
  resolve: {
    extensions: ['.vue', '.mjs', '.js', '.ts', '.tsx', '.json'],
    mainFields: ['browser', 'module', 'main'],
    alias: {
      '@': path.resolve(__dirname, path.join('src')),
      '@assets': path.resolve(__dirname, path.join('src', 'assets')),
      vue$: 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
    },
  },

  module: {
    rules: [
      //
      // Vue
      //

      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },

      //
      // Babel
      //

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            sourceType: 'unambiguous',
          },
        },
      },

      //
      // CSS
      //

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      //
      // Images
      //

      // Image optimiser
      {
        test: /\.(jpg|png|gif|svg)$/i,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre',
        options: {
          bypassOnDebug: true,
        },
      },
      // Loads small images as base64 URIs
      // {
      //   test: /\.(jpe?g|png|gif)$/i,
      //   loader: "url-loader",
      //   options: {
      //     // Images larger than 10 KB won’t be inlined
      //     limit: 10 * 1024,
      //     quotes: true,
      //   },
      // },
      // Loads small SVG images as base64 URIs (specifically optimised for SVG being text)
      // {
      //   test: /\.svg$/,
      //   loader: "svg-url-loader",
      //   options: {
      //     // Images larger than 10 KB won’t be inlined
      //     limit: 10 * 1024,
      //     // Remove quotes around the encoded URL –
      //     // they’re rarely useful
      //     noquotes: false,
      //   },
      // },
      // Load other SVGs inline
      // {
      //   test: /\.svg$/,
      //   loader: "svg-inline-loader",
      // },
      // Load all other images as files
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [fileLoader],
      },
      // Load all font files as files
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [fileLoader],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: path.resolve(__dirname, path.join('src', 'assets', 'logo.png')),
      // The prefix for all image files (might be a folder or a name)
      prefix: 'icons-[hash]/',
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#fff',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'Webpack App',

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ],
  externals: {
    jquery: '$',
  },
}

export default common
