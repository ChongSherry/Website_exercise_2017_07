import React, { Component } from 'react';
const UE = window.UE;
class Ueditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.initEditor()
    }
    componentWillUnmount() {
        // 组件卸载后，清除放入库的id
        UE.delEditor(this.props.id);
    }
    initEditor() {
        const id = this.props.id;
        const ueEditor = UE.getEditor(this.props.id, {
            initialFrameWidth: "100%",
            initialFrameHeight: this.props.height
        });
        const self = this;
        ueEditor.ready((ueditor) => {
            if (!ueditor) {
                UE.delEditor(id);
                self.initEditor();
            }
        })
    }
    render() {
        return (
            <div id={this.props.id} name="content" type="text/plain" style={{ lineHeight: "20px" }}></div>
        )
    }
}
export default Ueditor;
