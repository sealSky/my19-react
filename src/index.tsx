import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import Route from './router/index'
import { Provider } from 'react-redux'
import store from './store/store'
import './utils/setRem';

/*
* 引入样式
* */
import './style/base.css'
import './index.css';

console.log(1);
const render = Component => {
  ReactDOM.render(
    // 绑定redux、热加载
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  )
}

render(Route);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
