// 路径组件
import { Breadcrumb } from 'antd';
import React from 'react';
import SiteMap from '../../base/sitemap';
//引处路由组件
import { Link } from 'react-router';
export default class br extends React.Component {

    get_pathname() {
        let path = this.props.location.pathname;
        if (SiteMap[path]) {
            return SiteMap[path];
        } else {
            return [];
        }
    }
    creat_pathname() {
        var paths = this.get_pathname();
        var brs = [];
        for (var i = 0; i < paths.length; i++) {
            brs.push(
                <Breadcrumb.Item>
                    <Link to={paths[i].link}>
                        {paths[i].title}
                </Link>
                </Breadcrumb.Item>
            )
        }
        return brs;
    }
    render() {
        return (
            <Breadcrumb className="Breadcrumb-main">
                <Breadcrumb.Item>
                    <Link to={"/"}>
                        首页
                    </Link>
                </Breadcrumb.Item>
                {
                    this.creat_pathname()
                }
            </Breadcrumb>
        );
    }
}