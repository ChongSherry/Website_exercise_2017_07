import React from 'react';
import {
    Form, Input, DatePicker, Col, Spin, Button, Select, Radio
} from 'antd';
import { connect, Provider } from 'react-redux';
import ajax from '../base/ajax';
import actionType from '../redux/actionType';
import md5 from 'md5';
import LoginState from '../base/loginState';

import UE from '../component/ueditor';
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
const ueditor = window.UE;
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
            default_sel: "",
            content_id: "",//编辑时有效
            //fromData
            sort_id: "", //分类ID
            title: "", //标题
            subTitle: "", //副标题
            contentText: "",//内容
            keyword: "",  //关键词
            show: true, //显示
            top: false, //置顶
            isComment: true, //评论
            beginTime: new Date(Date.now()), //文章开始时羊（生效时间）
            draft: false
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
                contentText: xhr.response[0].info,
                keyword: (xhr.response[0].keyword) ? (xhr.response[0].keyword) : ""
            })
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

    handler_getContentText() {
        this.setState({ contentText: ueditor.getEditor("content_text").getContent() });
    }

    handler_submit() {

        this.handler_getContentText();
        //取得data
        let formData = Object.assign({}, this.state);
        delete formData.loading;
        delete formData.submiting;
        delete formData.sort_list;
        delete formData.default_sel;
        if (this.state.edit) {
            delete formData.edit;
            formData.contentText = ueditor.getEditor("content_text").getContent();
            this.setState({ submiting: true });
            this.props.dispatch(actionType.creat(actionType.LOADING, true));
            ajax.post(
                ajax.url(ajax.ports.content.info.updateContent),
                formData
            ).then((xhr) => {
                //跳转到内容列表
            }).complete(() => {
                this.setState({ submiting: false });
                this.props.dispatch(actionType.creat(actionType.LOADING, false));
            })
        } else {
            delete formData.edit;
            delete formData.content_id;
            formData.contentText = ueditor.getEditor("content_text").getContent();
            this.setState({ submiting: true });
            this.props.dispatch(actionType.creat(actionType.LOADING, true));
            ajax.post(
                ajax.url(ajax.ports.content.info.addContent),
                formData
            ).then((xhr) => {
                //跳转到内容列表
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
                            placeholder="输入分类"
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
                        validateStatus="success"
                    >
                        <UE id="content_text" height={500} />
                    </FormItem>

                    <FormItem >
                        <Col xs={{ span: 24, offset: 0 }} sm={{ span: 14, offset: 2 }}>
                            <Button type="primary" htmlType="submit" loading={this.state.submiting}
                                onClick={this.handler_submit.bind(this)}
                            >发布</Button>
                            &emsp;
                            <Button type="primary" htmlType="submit" loading={this.state.submiting}>保存为草稿</Button>
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