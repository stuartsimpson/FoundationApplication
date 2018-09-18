/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var debug = true;
var webpack = require('webpack');
var path = require('path');
var visualizer = require('webpack-visualizer-plugin');
var htmlWebpakPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public/dist');
var APP_DIR = path.resolve(__dirname, 'client');

var config = {
    mode:'development',
    devtool:'false',
    entry: {
        core: APP_DIR + '/js/core/index.jsx',
        fndtnUserAccount: APP_DIR + '/js/modules/fndtnUserAccount/index.jsx',
        fndtnUserAccountManager: APP_DIR + '/js/modules/fndtnUserAccountManager/index.jsx',
        fndtnResourceManager: APP_DIR + '/js/modules/fndtnResourceManager/index.jsx',
        fndtnRoleManager: APP_DIR + '/js/modules/fndtnRoleManager/index.jsx',
        fndtnMenuManager: APP_DIR + '/js/modules/fndtnMenuManager/index.jsx',
        fndtnAccessControlManager: APP_DIR + '/js/modules/fndtnAccessControlManager/index.jsx',
        fndtnUserRegistration: APP_DIR + '/js/modules/fndtnUserRegistration/index.jsx',
        nodeModules: [ 'react',
                       'react-dom',
                       '@material-ui/core',
                       'react-redux',
                       'react-router',
                       'react-google-recaptcha',
                       'react-tap-event-plugin',
                       'axios',
                       'history',
                       'redux',
                       'react-router-dom',
                       'redux-logger',
                       'redux-promise-middleware',
                       'redux-thunk']
    },
    output: {
        path: BUILD_DIR,
        filename: './[name]/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: APP_DIR,
                use:['babel-loader']
            }
        ]
    },
    plugins: debug ?
    [
        new visualizer({filename: './webpackStats.html'})
    ] :
    [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ],
    optimization:{
    }
};

module.exports = config;
