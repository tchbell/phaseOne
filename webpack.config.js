const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        // styles: './src/scss/styles.scss',
        main: './src/js/app.js',
        weather: './src/js/weatherReport.js'
    },
    output: {
        filename: 'js/[name].js', // JS output (required even if unused)
        path: path.resolve(__dirname, 'dist'),
        clean: true // Clean output dir before each build (Webpack 5 feature)
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS to file
                    'css-loader',                // Turns CSS into JS
                    'sass-loader'                // Compiles SCSS to CSS
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css', // Output CSS file location
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/index.html', to: '' },   // copy index.html to dist/
                { from: 'src/pages', to: 'pages' }    // copy pages folder to dist/pages/
            ],
        }),
    ],
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerPlugin(), //Minify CSS
        ]
    },
    mode: 'production' // Change to 'production' to minify output
};
