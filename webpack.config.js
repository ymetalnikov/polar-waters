const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const productionPluginDefine = isProduction ? [
    new UglifyJSPlugin()
] : [];


module.exports = {
    context: __dirname + "/src/client",
    entry: "./index.js",
    output: {
        path: __dirname + "/public/assets",
        publicPath: '/assets/',
        filename: "bundle.js"
    },
    watch: !isProduction,
    devtool: !isProduction ? 'eval' : false,
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("game.css"),
    ].concat(productionPluginDefine)
};
