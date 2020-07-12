const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log(__dirname);
console.log("你好啊");
module.exports = {
    entry: './main.js', //相对于指令的位置，不是当前文件的位置
    output: {
        filename: '[name][chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'), //相对于_dirname
    },
    mode: "production", //"development" | "production" | "none",
    plugins: [
        new CleanWebpackPlugin()
    ]
}