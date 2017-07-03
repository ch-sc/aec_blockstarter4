var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WatchLiveReloadPlugin = require('webpack-watch-livereload-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var NameAllModulesPlugin = require('name-all-modules-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry: {
        app: [
            // we need polyfill to make async/await work
            // for generators, to be more precise
            'babel-polyfill',
            './src/index.js'
        ],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'react-redux',
            'axios',
            'redux',
            'redux-logger',
            'babel-polyfill',
            'lodash-es'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: debug ? '[name].[hash].js' : '[name].[chunkhash].js'
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.css', '.html', '.scss', '.json'],
        alias: {
            /*Store: path.resolve(__dirname, 'src/js/Store.jsx'),
            Tiles: path.resolve(__dirname, 'src/js/Tiles'),
            Components:path.resolve(__dirname, 'src/js/Components')*/
            /*config: path.resolve(__dirname, 'app/config.js')*/
        }
    },
    externals: {
        /*config: 'config',*/
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            'env',
                            {
                                targets: {
                                    browsers: ['chrome >= 54', 'firefox > 50']
                                },
                                loose: true,
                                modules: false,
                                useBuiltIns: true //,
                                //debug: true
                            }
                        ],
                        'react',
                        'stage-3'
                    ],
                    plugins: [
                        'transform-runtime',
                        'react-html-attrs',
                        'transform-decorators-legacy',
                        'transform-class-properties'
                    ].concat(debug ? [] : ['transform-react-inline-elements'])
                },
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1, sourceMap: true }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: debug,
                                plugins: [require('autoprefixer')()]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(ttf|otf|eot|svg|woff|woff2|gif?)(\?[a-z0-9]+)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.html?$/,
                loader: 'html-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader'
                })
            },
            {
                test: /\.s(a|c)ss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: 'css-loader!sass-loader'
                })
            }
        ]
    },
    plugins: debug
        ? [
              new ExtractTextPlugin({
                  filename: 'app.bundle.css',
                  allChunks: true
              }),
              new WatchLiveReloadPlugin({
                  files: ['./src/**/*.html', './src/**/*.css', './src/**/*.less']
              }),
              new webpack.NamedModulesPlugin(),
              new webpack.NamedChunksPlugin(chunk => {
                  if (chunk.name) {
                      return chunk.name;
                  }
                  return chunk.modules.map(m => path.relative(m.context, m.request)).join('_');
              }),
              new webpack.optimize.CommonsChunkPlugin({
                  name: 'vendor',
                  minChunks: Infinity
              }),
              new webpack.optimize.CommonsChunkPlugin({
                  name: 'runtime'
              }),
              new NameAllModulesPlugin(),
              new HtmlWebpackPlugin({
                  template: 'public/index.html',
                  xhtml: true
              }) //,
              //new webpack.optimize.ModuleConcatenationPlugin()
          ]
        : [
              new webpack.DefinePlugin({
                  'process.env': {
                      NODE_ENV: JSON.stringify('production')
                  }
              }),
              new webpack.NamedModulesPlugin(),
              new webpack.NamedChunksPlugin(chunk => {
                  if (chunk.name) {
                      return chunk.name;
                  }
                  return chunk.modules.map(m => path.relative(m.context, m.request)).join('_');
              }),
              new webpack.optimize.CommonsChunkPlugin({
                  name: 'vendor',
                  minChunks: Infinity
              }),
              new webpack.optimize.CommonsChunkPlugin({
                  name: 'runtime'
              }),
              new NameAllModulesPlugin(),
              new HtmlWebpackPlugin({
                  template: 'public/index.html',
                  xhtml: true
              }),
              //new webpack.optimize.ModuleConcatenationPlugin(),
              new ExtractTextPlugin({
                  filename: 'app.bundle.css',
                  allChunks: true
              }),
              new webpack.optimize.UglifyJsPlugin({
                  //mangle: false,
                  compress: {
                      warnings: false
                  },
                  minimize: true,
                  sourcemap: false
              }),
              new OptimizeCssAssetsPlugin({
                  assetNameRegExp: /\.css$/g,
                  cssProcessor: require('cssnano'),
                  cssProcessorOptions: {
                      discardComments: { removeAll: true },
                      colormin: true,
                      discardDuplicates: true,
                      discardOverridden: true,
                      mergeLonghand: true,
                      minifyFontValues: true,
                      orderedValues: true,
                      reduceDisplayValues: true,
                      reduceInitial: true,
                      uniqueSelectors: true,
                      discardUnused: true,
                      minifyGradients: true,
                      minifySelectors: true,
                      svgo: true
                  },
                  canPrint: true
              }),
              new WebpackShellPlugin({
                  onBuildEnd: 'node copyFilesToDist.js'
              })
          ],
    devServer: {
        contentBase: 'src',
        historyApiFallback: true,
        proxy: [
            {
                context: '/epr',
                target: 'http://localhost:8090',
                secure: false
            }
        ]
    }
};
