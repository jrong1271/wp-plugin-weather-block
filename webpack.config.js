// webpack.config.js
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entryFiles = glob.sync('./src/**/*.js', { absolute: true });

const entries = entryFiles.reduce((acc, file) => {
  const name = path.relative('./src', file).replace(/\.js$/, '');
  acc[name] = file;
  return acc;
}, {});
module.exports = {
    entry: entries, // Entry point for your block JavaScript file
    output: {
        path: path.resolve(__dirname, './dist'), // Output directory
        filename: './[name].js', // Output file name
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Transpile .js and .jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel loader
                },
            },
            {
                test: /\.scss$/, // SCSS loader
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',   // Turns CSS into CommonJS
                  'sass-loader',  // Compiles Sass to CSS
                ],
              },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
        filename: '[name].css', // Output CSS filename, same as JS entry
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'], // Resolve these file extensions
    },
    mode: 'development', // Change to 'production' for production builds
};