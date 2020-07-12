# 安装webpack
`cnpm install webpack webpack-cli --save-dev`

# 创建webpack配置
```javascript
const path = require('path');
console.log(__dirname);
module.exports = {
    entry: './main.js',//相对于指令的位置，不是当前文件的位置
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: "development"
}

```

# 设置启动
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --config ./config/webpack.config.js"
  },
  ```
>
>生成的`dist/main.js`不可读，进行格式化
># 配置eslint
>由于个人希望不依靠ide来进行格式化，所以需要安装
`cnpm i -D eslint`
> ## 运行eslint
> `eslint ./dist/main.js --fix`
> 不管用，安装`JS-CSS-HTML Formatter`，`ctrl + s`,格式化

> 参考 https://www.cnblogs.com/sheseido/p/12357144.html
>

# 清除dist目录
安装`clean-webpack-plugin`,
```js
    mode:"development",
    plugins:[
        new CleanWebpackPlugin()        
    ]
```
