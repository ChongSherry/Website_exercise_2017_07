// 导航组件
import React from 'react';
import { Menu, Icon} from 'antd';

import { Link } from 'react-router';


export default class Nav extends React.Component {
  render() {
    return (
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className="list-menu">
            <Menu.Item key="1">
              <Link to={"/"}>
              <Icon type="poweroff" />
              <span>总览</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={"/zong"}>
              <Icon type="file-add" />
              <span>发布内容</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              key="sub1"
              title={<span><Icon type="file-text" /><span>内容管理</span></span>}
            >
              <Menu.Item key="11">
                <Link to={"/fen"}>
                <Icon type="file-text" />
                <span>内容管理</span>
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
              <Icon type="user" />
              <span>用户管理</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="video-camera" />
              <span>单页管理</span>
            </Menu.Item>
            <Menu.SubMenu
              key="sub2"
              title={<span><Icon type="lock" /><span>网站设置</span></span>}
            >
              <Menu.Item key="21">
                <Icon type="lock" />
                <span>频道设置</span>
              </Menu.Item>
             <Menu.Item key="22">
                <Icon type="lock" />
                <span>分类管理</span>
              </Menu.Item>
             <Menu.Item key="23">
                <Icon type="lock" />
                <span>字典管理</span>
              </Menu.Item>
              <Menu.Item key="24">
                <Link to={"/website_config"}>
                <Icon type="lock" />
                <span>网站管理</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
    );
  }
}