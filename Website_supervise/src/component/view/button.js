import { Button } from "antd";
import React from 'react';

export default class button extends React.Component {
    state={
        loading:false
    }
    render() {
        return (
            <Button.Group>
            <Button type="primary" icon="close" loading={this.state.loading}></Button>
            <Button type="primary" icon="edit" loading={this.state.loading}></Button>
            </Button.Group >
        );
    }
}