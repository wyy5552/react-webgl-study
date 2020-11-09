var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
};
var ThemeContext = React.createContext(themes.dark // 默认值
);

var ThemedButton = function (_React$Component) {
  _inherits(ThemedButton, _React$Component);

  function ThemedButton() {
    _classCallCheck(this, ThemedButton);

    return _possibleConstructorReturn(this, (ThemedButton.__proto__ || Object.getPrototypeOf(ThemedButton)).apply(this, arguments));
  }

  _createClass(ThemedButton, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var theme = this.context;
      return React.createElement('button', Object.assign({}, props, {
        style: { backgroundColor: theme.background }
      }));
    }
  }]);

  return ThemedButton;
}(React.Component);

ThemedButton.contextType = ThemeContext;

// 一个使用 ThemedButton 的中间组件
function Toolbar(props) {
  return React.createElement(
    ThemedButton,
    { onClick: props.changeTheme },
    'Change Theme'
  );
}

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this2.state = {
      theme: themes.light
    };

    _this2.toggleTheme = function () {
      _this2.setState(function (state) {
        return {
          theme: state.theme === themes.dark ? themes.light : themes.dark
        };
      });
    };
    return _this2;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
      // 而外部的组件使用默认的 theme 值
      return React.createElement(
        'div',
        null,
        React.createElement(
          ThemeContext.Provider,
          { value: this.state.theme },
          React.createElement(Toolbar, { changeTheme: this.toggleTheme })
        ),
        React.createElement(
          Section,
          null,
          React.createElement(ThemedButton, null)
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));