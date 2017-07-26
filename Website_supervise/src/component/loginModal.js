import React from 'react';
import { Modal, Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect, Provider } from 'react-redux';
import ajax from '../base/ajax';
import actionType from '../redux/actionType';
import md5 from 'md5';

import LoginState from '../base/loginState';
const FormItem = Form.Item;

class LoaginModal extends React.Component {

  state = {
    submit: false,
    user_id: "",
    password: ""
  }

  login() {
    const { user_id, password } = this.state;
    this.setState({ submit: true });
    ajax.post(
      ajax.url(ajax.ports.base.doLogin),
      { user_id, password: md5(password) }
    ).then((xhr) => {
      // 成功
      this.props.dispatch(actionType.creat(actionType.SET_LOGIN_STATE, true));
      this.props.dispatch(actionType.creat(actionType.LOADING, false));
      this.setState({ error: false });
      // 保存登录状态
      console.log(xhr);
      // debugger;
      LoginState.set(xhr.response.token);
    }).catch((msg, xhr) => {
      //失败
      this.setState({ error: true });
    }).complete(() => {
      this.setState({ submit: false });
    });
  }
  
  // 节点
  render() {

    return (
      <div>
        <Modal
          title={"请登录"}
          visible={this.props.show}
          closable={false}
          confirmLoading={this.state.submit}
          cancelText="重置"
          onCancel={() => { this.setState({ user_id: "", password: "" }) }}
          onOk={this.login.bind(this)}
        >
          <Form className="login-form">
            <FormItem>
              <Input value={this.state.user_id}
                prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名"
                onChange={
                  (e) => { this.setState({ user_id: e.target.value }) }

                }
              />
            </FormItem>
            <FormItem
              validateStatus={this.state.error ? "error" : ""}
            >
              <Input value={this.state.password}

                prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码"
                onChange={
                  (e) => {
                    this.setState({ password: e.target.value })
                  }
                }
              />
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}


export default connect(state => ({ state: state.get("view") }))(LoaginModal)