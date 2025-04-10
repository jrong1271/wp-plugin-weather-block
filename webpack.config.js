// webpack.config.js
const path = require('path');
const glob = require('glob');

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
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Resolve these file extensions
    },
    mode: 'development', // Change to 'production' for production builds
};