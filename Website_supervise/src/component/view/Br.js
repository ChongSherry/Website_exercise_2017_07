// 路径组件
import { Breadcrumb } from 'antd';
import React from 'react';

export default class br extends React.Component {
    render() {
        return (
            <Breadcrumb className="Breadcrumb-main">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}