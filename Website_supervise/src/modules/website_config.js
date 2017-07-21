// 网站信息管理组件
import React from 'react';
// import ReactDom from 'react-dom';
import { Form, Input, DatePicker, rows, Button, Select, Col  } from 'antd';
// 备案组件
import Reference from '../component/view/reference';


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


export default class website_config extends React.Component {
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
                    <Input placeholder="请输入网站名称" />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="网站简介"
                    validateStatus=""
                    help=""
                    Col={5}
                >
                    <Input.TextArea rows={4} placeholder="请输入网站基本介绍" />
                </FormItem >

                <FormItem
                    {...formItemLayout}
                    label="网站负责人"
                    hasFeedback
                    validateStatus=""
                    help=""
                >
                    <Input placeholder="请输入网站负责人" />
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="网站域名"
                    hasFeedback
                    validateStatus=""
                    help=""
                >
                    <Input placeholder="请输入网站域名（去除掉www和协议）" />
                </FormItem>

                {/*备案号选择  */}
                <Reference />
                {/*备案号选择  */}
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 6 },
                    }}
                >
                    <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        );
    }
}