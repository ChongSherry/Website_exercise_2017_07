// 主视图组件，也是主组件
import { Layout, Icon, Spin } from 'antd';
import React from 'react';
import '../App.css';
import { connect,Provider} from 'react-redux';
import {store} from '../redux/store';

import Nav from './view/nav.js';
import Br from './view/Br.js';
import LoginModal from './loginModal';
const { Header, Sider, Content } = Layout;

class view extends React.Component {
  constructor(props){
    super();
    this.state={
      collapsed:props.state.getIn(["view","collapsed"]),
      islogin:props.state.getIn(["view","islogin"])
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      collapsed:nextProps.state.getIn(["view","collapsed"]),
      islogin:nextProps.state.getIn(["view","islogin"])
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Spin tip="加载中..." spinning={!this.state.islogin} size="large">
        {/*登录modal  */}
        <LoginModal show={!this.state.islogin} />
        {/*登录modal  */}
        <Layout className="main-contetn">
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            className="left-main-content"
          >
            <div className="logo">
              <span className="logo_title">二组网站后台管理</span>
            </div>
            {/*导航栏  */}
            <Nav />
            {/*导航栏  */}
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>

            {/*路径展示  */}
            <Br />
            {/*路径展示  */}
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {
                !this.state.islogin ? "" : this.props.children
              }
            </Content>

          </Layout>
        </Layout>
      </Spin>

    );
  }
}

// 导出
export default connect(state => {
  return { state };
})(view);