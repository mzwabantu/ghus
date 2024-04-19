const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development', // or 'production'
    entry: './app.js', 
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'bundle.js', 
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ['@babel/preset-env'] 
                    }
                }
            }
        ]
    },
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "buffer": require.resolve("buffer/"),
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "vm": require.resolve("vm-browserify")
        }
    },
    plugins: [
        new Dotenv(),
    ],
};