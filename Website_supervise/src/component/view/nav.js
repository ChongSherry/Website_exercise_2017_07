// 导航组件
import React from 'react';
import { Menu, Icon, Modal } from 'antd';

import { Link } from 'react-router';
import actionType from '../../redux/actionType';

import { connect } from 'react-redux';
import LoginState from '../../base/loginState';



class Nav extends React.Component {
  state = {
    visible: false,
    loading: false,
    default_ok:this.props.location.pathname,
    default_col:""
  }
  outlogin() {
    this.setState({ loading: true });
    LoginState.clear();
    this.props.dispatch(actionType.creat(actionType.LOADING, true));
    this.setState({ loading: false, visible: false })
    this.props.dispatch(actionType.creat(actionType.SET_LOGIN_STATE, false));

  }
  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.location.pathname]} className="list-menu" defaultOpenKeys={["content","config"]}>
        <Menu.Item key="/">
          <Link to={"/"}>
            <Icon type="poweroff" />
            <span>总览</span>
          </Link>
        </Menu.Item>

        <Menu.SubMenu
          key="content"
          title={<span><Icon type="file-text" /><span>内容管理</span></span>}
        >
          <Menu.Item key="/content_add">
            <Link to={"/content_add"}>
              <Icon type="file-add" />
              <span>发布内容</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/content_list">
            <Link to={"/content_list"}>
              <Icon type="file-text" />
              <span>内容列表</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Icon type="file-text" />
            <span>专题管理</span>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="3">
          <Icon type="user" />
          <span>管理员设置</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to={"/user_control"}>
            <Icon type="user" />
            <span>用户管理</span></Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="video-camera" />
          <span>单页管理</span>
        </Menu.Item>
        <Menu.SubMenu
          key="config"
          title={<span><Icon type="lock" /><span>网站管理</span></span>}
        >
          <Menu.Item key="21">
            <Icon type="lock" />
            <span>频道设置</span>
          </Menu.Item>
          <Menu.Item key="/content_class">
            <Link to={"/content_class"}>
              <Icon type="lock" />
              <span>内容分类管理</span></Link>
          </Menu.Item>
          <Menu.Item key="23">
            <Icon type="lock" />
            <span>字典管理</span>
          </Menu.Item>
          <Menu.Item key="/website_config">
            <Link to={"/website_config"}>
              <Icon type="lock" />
              <span>网站配置</span>
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="6" >
          <div onClick={() => { this.setState({ visible: true }) }}>
            <Icon type="logout" />
            <span

            >退出登录</span></div>
        </Menu.Item>
        {/*退出模态框  */}
        <Modal
          visible={this.state.visible}
          title="退出登录"
          onOk={this.outlogin.bind(this)}
          okText="确定"
          cancelText="取消"
          onCancel={() => { this.setState({ visible: false }) }}
        >
          <p>是否退出登录？</p>
        </Modal>
      </Menu>
    );
  }
}


export default connect(state => ({ state: state.get("view") }))(Nav)