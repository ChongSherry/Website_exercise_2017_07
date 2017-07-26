import React from 'react';
import { Modal, Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect, Provider } from 'react-redux';
import ajax from '../../base/ajax';
import actionType from '../../redux/actionType';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
    },
};
export default class Modal_Class extends React.Component {
    state = {
        submitling: false,
        class_name: "",
        remark: "",
    }
    Cnaecel() {
        this.props.add_mod_close();
    }
    add_content_class() {
        this.setState({submitling:true});
        const {class_name,remark} = this.state;
        ajax.post(ajax.url(ajax.ports.content.class.addContent_class),
        {
            name:class_name,
            remark:remark
        }).then((xhr)=>{
            this.props.creatList();
        }).catch((xhr)=>{

        }).complete(()=>{
            this.setState({submitling:false});
            this.props.add_mod_close();
        })
        
    }
    render() {
        return (
            <div>
                <Modal
                    title="添加内容分类"
                    visible={this.props.show}
                    onCancel={this.Cnaecel.bind(this)}
                    onOk={this.add_content_class.bind(this)}
                    confirmLoading={this.state.submitling}
                >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="分类名"
                            hasFeedback
                            validateStatus=""

                        >
                            <Input placeholder="请输入分类名"
                                ref={"input_name"}
                                value={this.state.class_name}
                                onChange={(e) => {
                                    this.setState({ class_name: e.target.value })
                                }}
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="备注"
                            hasFeedback
                            validateStatus=""
                        >
                            <Input placeholder="请输入备注"
                                value={this.state.remark}
                                onChange={(e) => {
                                    this.setState({ remark: e.target.value })
                                }}
                            />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}