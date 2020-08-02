# React入门文档

## 1.安装环境
```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
$ npm config set registry https://registry.npm.taobao.org
$ cnpm install -g create-react-app
$ create-react-app my-app
$ cd my-app/
$ npm start
```

# 2.Hello world

打开App.js，里面返回的是首页结构
```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
            你好，世界！
        </div>
      </header>
    </div>
  );
}

export default App;
```

## 3.生命周期

### 组件的生命周期可分成三个状态：
 * Mounting：已插入真实 DOM
 * Updating：正在被重新渲染
 * Unmounting：已移出真实 DOM
### 生命周期的方法有：

* componentWillMount 在渲染前调用,在客户端也在服务端。
* componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。
* componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
* shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
可以在你确认不需要更新组件时使用。
* componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
* componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。
* componentWillUnmount在组件从 DOM 中移除之前立刻被调用。

## 4.新建页面
```
import React, { Component } from 'react';
import './FirstPage.css';

class FirstPage extends Component {
    render() {
        return (
            <div className="first-page">
               hello,FirstPage!
            </div>
        );
    }
}

export default FirstPage;
```

