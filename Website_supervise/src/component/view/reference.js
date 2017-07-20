// 备案号输入组件
import React from 'react';
import { Select, Form, Input } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;



// 备案号选项
const selectBefore = (
    <Select defaultValue="京ICP备" style={{ width: 80 }}>
        <Option value="京ICP备">京ICP备</Option>
        <Option value="陕ICP备">陕ICP备</Option>
        <Option value="黑ICP备">黑ICP备</Option>
        <Option value="沪ICP备">沪ICP备</Option>
        <Option value="津ICP备">津ICP备</Option>
        <Option value="冀ICP备">冀ICP备</Option>
        <Option value="晋ICP备">晋ICP备</Option>
        <Option value="蒙ICP备">蒙ICP备</Option>
        <Option value="辽ICP备">辽ICP备</Option>
        <Option value="苏ICP备">苏ICP备</Option>
        <Option value="浙ICP备">浙ICP备</Option>
        <Option value="皖ICP备">皖ICP备</Option>
        <Option value="闽ICP备">闽ICP备</Option>
        <Option value="赣ICP备">赣ICP备</Option>
        <Option value="鲁ICP备">鲁ICP备</Option>
        <Option value="豫ICP备">豫ICP备</Option>
        <Option value="鄂ICP备">鄂ICP备</Option>
        <Option value="湘ICP备">湘ICP备</Option>
        <Option value="粤ICP备">粤ICP备</Option>
        <Option value="桂ICP备">桂ICP备</Option>
        <Option value="琼ICP备">琼ICP备</Option>
        <Option value="渝ICP备">渝ICP备</Option>
        <Option value="蜀ICP备">蜀ICP备</Option>
        <Option value="黔ICP备">黔ICP备</Option>
        <Option value="滇ICP备">滇ICP备</Option>
        <Option value="藏ICP备">藏ICP备</Option>
        <Option value="陇ICP备">陇ICP备</Option>
        <Option value="青ICP备">青ICP备</Option>
        <Option value="宁ICP备">宁ICP备</Option>
        <Option value="新ICP备">新ICP备</Option>
    </Select>
);

export default class reference extends React.Component {
    render() {
        return (
            <FormItem
                labelCol={{
                    xs: { span: 24 },
                    sm: { span: 5 },
                }}
                wrapperCol={{
                    xs: { span: 24 },
                    sm: { span: 12 },
                }}
                label="域名备案号"
                hasFeedback
                validateStatus=""
                help=""
            >
                <Input addonBefore={selectBefore} addonAfter={"号"} placeholder="请输入域名备案号" />
            </FormItem>
        )
    }
}