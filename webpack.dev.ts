/**
 * Webpack development config
 */

import CleanWebpackPlugin from 'clean-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
import merge from 'webpack-merge'

import common from './webpack.common'

const developmentConfig: webpack.Configuration = merge(common, {
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, path.join('dist', 'dev')),
  },

  mode: 'development',
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 9000,
  },

  // plugins: [new CleanWebpackPlugin([path.join('dist', 'dev')])],
})

export default developmentConfig
