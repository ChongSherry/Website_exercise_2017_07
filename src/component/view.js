// 主视图组件，也是主组件
import { Layout, Icon } from 'antd';
import React from 'react';
import '../App.css';

import Nav from './view/nav.js';
import Br from './view/Br.js';
const { Header, Sider, Content } = Layout;

 export default class view extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
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
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {
              this.props.children
            }
          </Content>
        </Layout>
      </Layout>
    );
  }
}