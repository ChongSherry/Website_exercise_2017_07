import { Table, Button } from 'antd';
import React from 'react';
import Buttons from '../component/view/button.js';


const columns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Phone',
  dataIndex: 'phone',
}, {
  title: 'Operation',
  dataIndex: 'operation',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: parseInt(Math.random() * 56234561) + `  编号为：${i}`,
    name: `London, Park Lane no. ${i}`,
    phone: parseInt(Math.random() * 10000000000),
    operation: <Buttons />,
  });
}

export default class App extends React.Component {
  state = {
    selectedRowKeys: [],  // Check here to configure the default column
    loading: false,
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}