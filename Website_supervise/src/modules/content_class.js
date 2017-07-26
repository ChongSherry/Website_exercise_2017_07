import React from 'react';
import { Modal, Form, Icon, Input, Table, Button, message, notification } from 'antd';
import { connect, Provider } from 'react-redux';
import ajax from '../base/ajax';
import actionType from '../redux/actionType';
import md5 from 'md5';
import LoginState from '../base/loginState';

import Mod_class_add from './content_class/mod_class_add';
import Mod_class_edit from './content_class/mod_class_edit';
class ContentClass extends React.Component {

    state = {
        list: [],
        selectRecord: [],
        visible: false,
        edit: false,
        record: undefined,
        table: false
    };
    componentDidMount() {
        this.setState({ selectedRowKeys: [] })
        this.creatList()
        this.show_lo();
        this.setState({ table: true })
    }

    creatList() {

        this.props.dispatch(actionType.creat(actionType.LOADING, true));
        if (LoginState.get()) {

            ajax.post(
                ajax.url(ajax.ports.content.class.selectContent_class)
            ).then((xhr) => {
                this.props.dispatch(actionType.creat(actionType.LOADING, false));
                this.setState({ list: xhr.response });
            }).catch((msg, xhr) => {
                // alert(msg.message);
            }).complete(() => {
                this.props.dispatch(actionType.creat(actionType.LOADING, false));
            })
        } else {

        }

    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    // 选中时获取到的row的信息
    handler_select_change(keys, rows) {
        var records = [];
        for (var i = 0; i < rows.length; i++) {
            records.push(rows[i]._id);
        }
        this.setState({ selectRecord: records });
    }
    // 删除数据前提操作
    handler_remove_data(id) {
        // 正式删除
        let doRemove = () => {
            var ids = [];

            if (id) {
                ids.push(id)
            } else {

                ids = this.state.selectRecord
            }
            this.props.dispatch(actionType.creat(actionType.LOADING, true));
            
            ajax.post(
                ajax.url(ajax.ports.content.class.removeContent_class),
                { "ids": ids }
            ).then(() => {
                this.creatList();
                this.setState({ table: false })
                this.setState({ table: true })
                this.setState({ selectRecord: [] });
            }).catch((msg) => {

            }).complete(() => {
                this.props.dispatch(actionType.creat(actionType.LOADING, false));
            });
        }

        Modal.confirm({
            title: '请确认操作',
            content: '分类删除后将不可恢复，您确认要这样做吗？',
            onOk() {
                doRemove();
            },
            onCancel() {

            },
        });
    }
    // 关闭添加框
    add_mod_close() {
        this.setState({ visible: false });
    }
    // 关闭编辑框
    edit_mod_close(record) {
        this.setState({
            edit: false,
            record: undefined
        });
    }
    // 打开编辑
    handler_do_edit(record) {
        this.setState({
            edit: true,
            record: record
        });
    }
    show_lo() {
        console.log(this.props.location.pathname)
    }
    render() {
        var { selectedRowKeys } = this.state;
        var rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [{
            title: '分类名',
            dataIndex: 'name',
            key: "name"
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            render: (text, record) => {
                return (
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal", width: "100%" }} title={record.remark}>
                        {
                            record.remark.substring(0, 40) + (record.remark.length > 40 ? "..." : "")
                        }
                    </div>
                );
            }
        }, {
            title: "操作",
            dataIndex: "caozuo",
            key: 'caozuo',
            render: (text, record) => (
                <span>
                    <Button.Group size={"small"}>
                        <Button type="primary"
                            onClick={() => this.handler_do_edit(record)}
                        >
                            <Icon type="edit" />编辑
                        </Button>
                        <Button type="primary">
                            <Icon type="arrow-up" />上移
                        </Button>
                        <Button type="primary">
                            <Icon type="arrow-down" />下移
                        </Button>
                    </Button.Group>
                    &emsp;
                    <Button type="danger" size={"small"}
                        onClick={() => this.handler_remove_data(record._id)}
                    >
                        <Icon type="delete" />删除
                    </Button>
                </span>
            )
        }];
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={() => { this.setState({ visible: true }) }}

                    >
                        添加分类
                    </Button>
                    <Button
                        type="danger"
                        disabled={(this.state.selectRecord.length == 0)}
                        onClick={() => this.handler_remove_data()}
                    >
                        批量删除
                    </Button>

                    <span style={{ marginLeft: 8 }}>

                    </span>
                </div>
                {/*添加modal  */}
                {this.state.visible && <Mod_class_add
                    show={this.state.visible}
                    add_mod_close={this.add_mod_close.bind(this)}
                    creatList={this.creatList.bind(this)}
                />
                }
                {/*编辑modal  */}
                {this.state.edit && <Mod_class_edit
                    show={this.state.edit}
                    recordss={this.state.record}
                    edit_mod_close={this.edit_mod_close.bind(this)}
                    creatList={this.creatList.bind(this)}
                />
                }
                {/*表格  */}
                {this.state.table &&
                    <Table rowSelection={{ onChange: this.handler_select_change.bind(this), selections: { key: "" } }} columns={columns} dataSource={this.state.list}
                        dataSource={this.state.list} pagination={{ defaultPageSize: 10, showQuickJumper: true, showSizeChange: true }}
                />
                }
            </div>
        );
    }
}

export default connect(state => ({ state: state.get("view") }))(ContentClass)