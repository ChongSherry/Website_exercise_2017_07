// 充当链接，用来写路由组件
import React, { Component } from 'react';
import './App.css';
import {  Router, Route, IndexRoute, hashHistory} from 'react-router'
// 引入路由组件
import View from './component/view.js'
// 测试组件
import Zong from './modules/zong.js';
import Fen from './modules/fen.js';
// 网站信息管理
import Website_config from './modules/website_config';

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        {/*引入容器组件  */}
        <Route path="/" component={View}>
          <IndexRoute component={Website_config}  />
          <Router path="/zong" component={Zong} />
          <Router path="/fen" component={Fen} />
          <Router path="/website_config" component={Website_config} />
        </Route>
      </Router>
    );
  }
}

export default App;
