import React from 'react';
import {
    Form, Input, DatePicker, Col, Spin, Button, Select, Radio,Upload,message,Icon
} from 'antd';
import { connect, Provider } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';
import ajax from '../base/ajax';
import actionType from '../redux/actionType';
import md5 from 'md5';
import LoginState from '../base/loginState';
import UE from './ueditor/ueditor';
import moment from 'moment';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
    },
};

const timeFormat = "YYYY-MM-DD HH:mm:ss";
class content_add extends React.Component {
    constructor(props) {
        super();
        this.state = this.getInitalState()
    }

    getInitalState() {
        return {
            //组件着态
            edit: false, //编辑状态
            submiting: false,
            sort_list: [],
            content_id: "",//编辑时有效
            
            //fromData
            logo:"",
            sort_id: "", //分类ID
            title: "", //标题
            subTitle: "", //副标题
            info: "",//简介
            keyword: "",  //关键词
            show: false, //显示
            top: false, //置顶
            isComment: false, //评论
            beginTime: new Date(Date.now()), //文章开始时羊（生效时间）
            isdraft: false,
            contentText: []
        }
    }
    componentDidMount() {
        this.handler_get_sort();
        this.checkMode(this.props);


    }
    checkMode(props) {
        if (props.location.pathname == "/content_edit") {
            let content_id = props.location.state.content_id;
            this.setState({
                edit: true,
                content_id
            });
            this.idSelectContents(content_id);
        } else {
            if (this.state.edit) {
                this.setState(this.getInitalState());
                this.handler_get_sort();
            }
        }
    }
    // 有id时获取内容数据
    idSelectContents(content_id) {
        this.props.dispatch(actionType.creat(actionType.LOADING, true));
        ajax.post(
            ajax.url(ajax.ports.content.info.isSelectContent),
            {
                "content_id": content_id
            }
        ).then((xhr) => {
            this.setState({
                sort_id: xhr.response[0].classid,
                title: xhr.response[0].title,
                subTitle: xhr.response[0].subTitle,
                beginTime: xhr.response[0].sendtime,
                top: xhr.response[0].istop,
                show: xhr.response[0].isshow,
                isComment: xhr.response[0].iscomment,
                info: xhr.response[0].info,
                keyword: (xhr.response[0].keyword) ? (xhr.response[0].keyword) : "",
                contentText: xhr.response[0].content,
                isdraft: xhr.response[0].isdraft,
                logo:xhr.response[0].img_url
            })
            this.refs.content_editer.setContent(xhr.response[0].content);
        }).catch((error) => {

        }).complete(() => {
            this.props.dispatch(actionType.creat(actionType.LOADING, false));
        })
    }
    handler_get_sort() {
        this.props.dispatch(actionType.creat(actionType.LOADING, true));
        ajax.post(
            ajax.url(ajax.ports.content.class.selectContent_class)
        ).then((xhr) => {
            this.setState({ sort_list: xhr.response });
            this.setState({ default_sel: xhr.response[1].name });
        }).catch((error) => {

        }).complete(() => {
            this.props.dispatch(actionType.creat(actionType.LOADING, false));
        })
    }
    // 编辑器内容转换
    handler_getContentText() {
        // this.setState({ contentText: ueditor.getEditor("content_text").getContent() });
        var contentText = this.refs.content_editer.getContent() || ""
        console.log(contentText);
        this.state.contentText = contentText.replace(/&/g, "{@and}");
    }
    // 保存内容
    handler_submit(bool) {
        this.handler_getContentText();
        let formData = Object.assign({}, this.state);
        //取得data
        if (!!bool) {
            formData.isdraft = true;
        } else {
            formData.isdraft = false
        }


        delete formData.loading;
        delete formData.submiting;
        delete formData.sort_list;
        delete formData.default_sel;
        if (this.state.edit) {
            delete formData.edit;
            this.setState({ submiting: true });
            this.props.dispatch(actionType.creat(actionType.LOADING, true));
            ajax.post(
                ajax.url(ajax.ports.content.info.updateContent),
                formData
            ).then((xhr) => {
                //跳转到内容列表
                hashHistory.push("/content_list")
            }).complete(() => {
                this.setState({ submiting: false });
                this.props.dispatch(actionType.creat(actionType.LOADING, false));
            })
        } else {
            delete formData.edit;
            delete formData.content_id;
            this.setState({ submiting: true });
            this.props.dispatch(actionType.creat(actionType.LOADING, true));
            ajax.post(
                ajax.url(ajax.ports.content.info.addContent),
                formData
            ).then((xhr) => {
                //跳转到内容列表
                hashHistory.push("/content_list")
            }).complete(() => {
                this.setState({ submiting: false });
                this.props.dispatch(actionType.creat(actionType.LOADING, false));
            })
        }


    }

    render() {
        return (

            <div>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="所属分类"
                        hasFeedback
                        validateStatus=""

                    >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="选择分类"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            value={this.state.sort_id}
                            onChange={(v) => { this.setState({ sort_id: v }) }}
                        >
                            {
                                this.state.sort_list.map((v, k) => {
                                    return (
                                        <Option value={v._id}>{v.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="标题"
                        hasFeedback
                        validateStatus=""
                    >
                        <Input placeholder="请输入标题"
                            value={this.state.title}
                            onChange={e => this.setState({ title: e.target.value })}
                            style={{ maxWidth: 500 }} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="子标题"
                        hasFeedback
                        validateStatus=""
                    >
                        <Input placeholder="请输入子标题"
                            value={this.state.subTitle}
                            onChange={e => this.setState({ subTitle: e.target.value })}
                        />
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="封面图片"
                    help="可不填"
                    hasFeedback
                    validateStatus="warning"
                >
                    <Upload
                        className="avatar-uploader"
                        name="logo"
                        showUploadList={false}
                        action={ajax.url(ajax.ports.content.info.upload)}
                        headers={
                            { token: LoginState.get() }
                        }
                        onChange={
                            (info) => {
                                if (info.file.status !== 'uploading') {

                                }
                                if (info.file.status === 'done') {
                                    message.success(`${info.file.name}上传完成`);
                                    this.setState({ logo: info.file.response.fileName });
                                } else if (info.file.status === 'error') {
                                    message.error(`${info.file.name} file upload failed.`);
                                }
                            }
                        }
                    >
                        {
                            this.state.logo ?
                                <img src={ajax.ports.server + "/logo/content/" + this.state.logo} alt="" className="avatar" /> :
                                <Icon type="plus" className="avatar-uploader-trigger" />
                        }
                    </Upload>
                </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="简介"
                        hasFeedback
                    >
                        <Input.TextArea rows={4} placeholder="请输入内容简介" style={{ maxWidth: 600 }} value={this.state.info} onChange={(e) => { this.setState({ info: e.target.value }) }} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="关键字"
                        hasFeedback
                        validateStatus=""
                    >
                        <Input
                            value={this.state.keyword}
                            onChange={e => this.setState({ keyword: e.target.value })}
                            placeholder={'请输入网站关键字，并用","分割'} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="生效时间"
                        hasFeedback
                        validateStatus=""
                    >
                        <DatePicker
                            showTime
                            placeholder="请选择生效日期和时间"
                            defaultValue={moment(this.state.beginTime, timeFormat)}
                            format={timeFormat}
                            onChange={(d, str) => this.setState({ beginTime: str })}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="可以评论"
                        hasFeedback
                        validateStatus=""
                    >
                        <RadioGroup
                            value={this.state.isComment}
                            onChange={(e) => { this.setState({ isComment: e.target.value }) }}
                        >
                            <Radio value={false}>否</Radio>
                            <Radio value={true}>是</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="发布显示"
                        hasFeedback
                        validateStatus=""
                    >
                        <RadioGroup
                            value={this.state.show}
                            onChange={(e) => { this.setState({ show: e.target.value }) }}
                        >
                            <Radio value={false}>否</Radio>
                            <Radio value={true}>是</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="置顶"
                        hasFeedback
                        validateStatus=""
                    >
                        <RadioGroup
                            value={this.state.top}
                            onChange={(e) => { this.setState({ top: e.target.value }) }}
                        >
                            <Radio value={false}>否</Radio>
                            <Radio value={true}>是</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="内容"
                        hasFeedback
                    >
                        <UE id="content_text" ref={"content_editer"} height={500} />
                    </FormItem>

                    <FormItem >
                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 14, offset: 2 }}>
                            <Button type="primary" htmlType="submit" loading={this.state.submiting}
                                onClick={() => { this.handler_submit(false) }}
                            >发布</Button>
                            &emsp;
                            <Button htmlType="submit" loading={this.state.submiting} onClick={() => { this.handler_submit(true) }} >保存为草稿</Button>
                            &emsp;
                            <Button type="danger" htmlType="submit" loading={this.state.submiting}>重置</Button>
                        </Col>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default connect(state => ({ state: state.get("view") }))(content_add)