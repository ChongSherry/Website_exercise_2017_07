import React, { Component } from 'react';
const UE = window.UE;
class Ueditor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.ueEditor = null;
    }
    componentDidMount() {
        this.initEditor()
        // var ue = UE.getEditor('container', {
        //     indent: false,
        //     gmap: false, //google地图
        //     map: false,//百度地图
        //     preview: false, //预览
        //     insertvideo: false, //视频
        //     wordimage: false, //图片转存
        //     webapp: false, //百度引用
        //     template: false, //模板
        //     music: false, //音乐
        //     drafts: false //从草稿箱加载
        // });
    }
    componentWillUnmount() {
        // 组件卸载后，清除放入库的id
        UE.delEditor(this.props.id);
    }

    getContent() {
        return this.ueEditor.getContent();
    }

    setContent(content) {
        this.ueEditor.ready(() => {
            this.ueEditor.setContent(content);
        });

    }

    initEditor() {
        const id = this.props.id;
        this.ueEditor = UE.getEditor(this.props.id, {
            initialFrameWidth: "100%",
            initialFrameHeight: this.props.height
        });
        const self = this;
        this.ueEditor.ready((ueditor) => {
            if (!ueditor) {
                UE.delEditor(id);
                self.initEditor();
            }
        });
    }
    render() {
        return (
            <div id={this.props.id} name="content" type="text/plain" style={{ lineHeight: "20px" }}></div>
        )
    }
}
export default Ueditor;