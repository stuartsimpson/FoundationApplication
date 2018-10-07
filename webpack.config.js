var debug = true;
var webpack = require('webpack');
var path = require('path');
var visualizer = require('webpack-visualizer-plugin');
var htmlWebpakPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public/modules');
var APP_DIR = path.resolve(__dirname, 'client');

var config = {
    mode:'development',
    devtool:'false',
    entry: {
        core: APP_DIR + '/modules/core/index.jsx',
        fndtn_UserAccount: APP_DIR + '/modules/fndtn/UserAccount/index.jsx',
        fndtn_UserAccountManager: APP_DIR + '/modules/fndtn/UserAccountManager/index.jsx',
        fndtn_ResourceManager: APP_DIR + '/modules/fndtn/ResourceManager/index.jsx',
        fndtn_RoleManager: APP_DIR + '/modules/fndtn/RoleManager/index.jsx',
        fndtn_MenuManager: APP_DIR + '/modules/fndtn/MenuManager/index.jsx',
        fndtn_AccessControlManager: APP_DIR + '/modules/fndtn/AccessControlManager/index.jsx',
        fndtn_UserRegistration: APP_DIR + '/modules/fndtn/UserRegistration/index.jsx',
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
        filename: (chunkData) => { return('./'+chunkData.chunk.name.replace('_','/')+'/bundle.js')}
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: APP_DIR,
                use:[{loader:'babel-loader'}]
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
