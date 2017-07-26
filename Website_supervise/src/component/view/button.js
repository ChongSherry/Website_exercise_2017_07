import { Button } from "antd";
import React from 'react';

export default class button extends React.Component {
    state = {
        loading: false
    }
    render() {
        return (
            <span>
                <Button.Group>
                    <Button type="primary" icon="edit" loading={this.state.loading}>编辑</Button>
                    <Button type="primary" icon="arrow-up" loading={this.state.loading}>上移</Button>
                    <Button type="primary" icon="arrow-down" loading={this.state.loading}>下移</Button>
                </Button.Group >
                &emsp;
                <Button.Group>
                    <Button type="danger" icon="close" loading={this.state.loading}>删除</Button>
                </Button.Group >
            </span>
        );
    }
}