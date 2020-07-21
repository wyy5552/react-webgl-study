import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function Clock(props){
  return <h1>Hello, {props.date.toLocaleTimeString()}world!</h1>;
}
class ClockCla extends React.Component{
  render(){
    return <h1>Hello, {this.props.date.toLocaleTimeString()}world!</h1>;
  }
}
function stick() {
  ReactDOM.render(
    <ClockCla date={new Date()}></ClockCla>,
    document.getElementById('root')
  );
}
setInterval(stick, 1000);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
