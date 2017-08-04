// 网站信息管理组件
import React from 'react';
// import ReactDom from 'react-dom';
import { Form, Input, DatePicker, rows, Button, Select, Col, Upload, message, Icon } from 'antd';
import ajax from '../base/ajax';
import actionType from '../redux/actionType';
import md5 from 'md5';
import { connect, Provider } from 'react-redux';
import LoginState from '../base/loginState';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};


class website_config extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: "", //网站名称
            info: "", //网站简介
            manager: "", //负责人
            contact: "", //联系方式
            copyright: "",//网站版权
            domain: "", //网站域名
            filing_num: "", //网站备案号
            filing_info: "", //网站备案信息
            logo_url: "" //网站logo标志url(横图)
        }
    }
    componentDidMount() {
        this.getList();
    }
    submit() {
        let formData = Object.assign({}, this.state);
        console.log(formData);
        this.props.dispatch(actionType.creat(actionType.LOADING, true));
        ajax.post(ajax.url(ajax.ports.config.create),
            formData
        ).then((xhr) => {
            message.success("保存成功")
        }).complete(() => {
            this.props.dispatch(actionType.creat(actionType.LOADING, false));
        })
    }
    getList() {
        this.props.dispatch(actionType.creat(actionType.LOADING, true));
        ajax.get(ajax.url(ajax.ports.config.getList))
            .then((xhr) => {
                this.setState({
                    name: xhr.response[0].name,
                    info: xhr.response[0].info, //网站简介
                    manager: xhr.response[0].manager, //负责人
                    contact: xhr.response[0].contact, //联系方式
                    copyright: xhr.response[0].copyright,//网站版权
                    domain: xhr.response[0].domain, //网站域名
                    filing_num: xhr.response[0].filing_num, //网站备案号
                    filing_info: xhr.response[0].filing_info, //网站备案信息
                    logo_url: xhr.response[0].logo_url //网站logo标志url(横图)
                })
            }).complete(() => {
                this.props.dispatch(actionType.creat(actionType.LOADING, false));
            })
    }
    render() {
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="网站名称"
                    hasFeedback
                    validateStatus=""
                    help=""
                >
                    <Input placeholder="请输入网站名称"
                        value={this.state.name}
                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网站logo"
                    hasFeedback
                    validateStatus=""
                    help=""
                >
                    <Upload
                        className="avatar-uploader"
                        name="logo"
                        showUploadList={false}
                        action={ajax.url(ajax.ports.config.upload)}
                        headers={
                            { token: LoginState.get() }
                        }
                        onChange={
                            (info) => {
                                if (info.file.status !== 'uploading') {

                                }
                                if (info.file.status === 'done') {
                                    message.success(`${info.file.name}上传完成`);
                                    this.setState({ logo_url: info.file.response.fileName });
                                } else if (info.file.status === 'error') {
                                    message.error(`${info.file.name} file upload failed.`);
                                }
                            }
                        }
                    >
                        {
                            this.state.logo_url ?
                                <img src={ajax.ports.server + "/logo/website/" + this.state.logo_url} alt="" className="avatar" /> :
                                <Icon type="plus" className="avatar-uploader-trigger" />
                        }
                    </Upload>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网站简介"
                    validateStatus=""
                    help=""
                    Col={5}
                >
                    <Input.TextArea rows={4} placeholder="请输入网站基本介绍"
                        value={this.state.info}
                        onChange={(e) => { this.setState({ info: e.target.value }) }}
                    />
                </FormItem >

                <FormItem
                    {...formItemLayout}
                    label="网站负责人"
                    hasFeedback
                    validateStatus=""
                    help=""
                >
                    <Input placeholder="请输入网站负责人"
                        value={this.state.manager}
                        onChange={(e) => { this.setState({ manager: e.target.value }) }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网站联系方式"
                    hasFeedback
                    validateStatus=""
                    help=""
                >
                    <Input placeholder="请输入网站联系方式"
                        value={this.state.contact}
                        onChange={(e) => { this.setState({ contact: e.target.value }) }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网站版权"
                    hasFeedback
                    validateStatus=""
                    help=""
                >
                    <Input placeholder="© 2017 标志名 或者 标志名 © 2017"
                        value={this.state.copyright}
                        onChange={(e) => { this.setState({ copyright: e.target.value }) }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网站域名"
                    hasFeedback
                    validateStatus=""
                    help=""
                >
                    <Input placeholder="https://www.baidu.com"
                        value={this.state.domain}
                        onChange={(e) => { this.setState({ domain: e.target.value }) }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网站备案号"
                    hasFeedback
                    validateStatus=""
                    help=""
                >
                    <Input placeholder="京ICP备000000号"
                        value={this.state.filing_num}
                        onChange={(e) => { this.setState({ filing_num: e.target.value }) }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网站备案信息"
                    hasFeedback
                    validateStatus=""
                    help=""
                >
                    <Input placeholder="京公网安备 00000000号"
                        value={this.state.filing_info}
                        onChange={(e) => { this.setState({ filing_info: e.target.value }) }}
                    />
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 6 },
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={this.submit.bind(this)}>保存</Button>
                </FormItem>
            </Form>
        );
    }
}

export default connect(state => ({ state: state.get("view") }))(website_config)