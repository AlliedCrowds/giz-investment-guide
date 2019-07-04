/**
 * Webpack production config
 */

import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import * as path from 'path'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import * as webpack from 'webpack'
import merge from 'webpack-merge'

import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import common from './webpack.common'

const developmentConfig: webpack.Configuration = merge(common, {
  output: {
    filename: 'build.[hash].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, `./dist/${process.env.NODE_ENV}`),
  },

  mode: 'production',
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true, // set to true if you want JS source maps
      // }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',

      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      // maxInitialRequests: Infinity,
      minChunks: 1,

      minSize: 30 * 1024,
      maxSize: 244 * 1024,

      name: true,

      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1]

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`
          },
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    // new CleanWebpackPlugin([path.join('dist', 'prod')]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    // new Dotenv(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunksSortMode: 'dependency',
    }),
    new CopyWebpackPlugin([
      {
        from: './CNAME',
        to: './',
        transform: function(content, path) {
          return process.env.NODE_ENV == 'production'
            ? 'make-it.alliedcrowds.com'
            : 'dev-make-it.alliedcrowds.com'
        },
      },
      {
        from: './404.html',
        to: './',
      },
    ]),
  ],
})
if (process.env.NODE_ENV === 'development') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        API_URL: '"https://dev-api.alliedcrowds.com/1.0/"',
      },
    }),
  ])
}
if (process.env.NODE_ENV === 'local') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"local"',
        API_URL: '"http://localhost:5000/1.0/"',
      },
    }),
  ])
}
export default developmentConfig
