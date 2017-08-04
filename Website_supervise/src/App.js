// 充当链接，用来写路由组件
import React, { Component } from 'react';
import './App.css';
import { connect, Provider } from 'react-redux';
import { store } from './redux/store';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
// 引入路由组件
import View from './component/view.js'
// 测试组件
import Zong from './modules/zong.js';
import Fen from './modules/fen.js';
// 网站信息管理
import Website_config from './modules/website_config';
//用户管理
import User_control from './modules/user_control.js';
// 分类管理
import Content_class from './modules/content_class';
// 添加内容
import Content_add from './modules/content_add';
// 内容列表modules
import Content_list from './modules/content_list';
// 专题管理
import Subject from './modules/subject';
// 频道管理
import Channel from './modules/channel';
// 单页管理
import Singlepage from './modules/Singlepage';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          {/*引入容器组件  */}
          <Route path="/" component={View}>
            <IndexRoute component={Zong} />
            <Router path="/zong" component={Zong} />
            <Router path="/fen" component={Fen} />
            <Router path="/website_config" component={Website_config} />
            <Router path="/user_control" component={User_control} />
            <Route path="/content_class" component={Content_class} />
            <Route path="/Content_add" component={Content_add} />
            <Route path="/Content_edit" component={Content_add} />
            <Route path="/Content_list" component={Content_list} />
            <Route path="/Subject" component={Subject} />
            <Route path="/Channel" component={Channel} />
            <Route path="/Singlepage" component={Singlepage} />
            
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
