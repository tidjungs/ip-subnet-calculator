import React, { Component } from 'react';
import { 
  Input,
  Icon,
  Radio,
  Select,
  Button,
  Table,
  message
} from 'antd';

import { generateSubnetByClass, getResult, ipv4 } from './utils/helper';
import './App.css';

const RadioGroup = Radio.Group;
const Option = Select.Option;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Value',
  dataIndex: 'value',
  key: 'value',
}];

const info = () => {
  message.config({ duration: 1, });
  message.error('cannot calculate!');
};


class App extends Component {
  state = {
    selectedClass: 'ANY',
    selectledSubnet: null,
    subnets: generateSubnetByClass('ANY'),
    result: [],
    ip: { val: '', err: false },
  }
  
  onClassChange = e => {
    this.setState({
      selectedClass: e.target.value,
      subnets: generateSubnetByClass(e.target.value)
    });
  }

  onSubnetChange = subnet => {
    this.setState({
      selectledSubnet: +subnet.slice(-2),
    })
  }

  onIPChange = e => {
    const { value } = e.target;
    this.setState({
      ip: { val: value, err: !ipv4(value) && value !== '' },
    });
  }

  onSubmitCalculate = () => {
    const { ip, selectledSubnet } = this.state;
    
    if (selectledSubnet === null || ip.val === '' || ip.err) {
      return info()
    }

    this.setState({
      result: getResult(ip.val, selectledSubnet),
    });
  }

  render() {
    const { selectedClass, selectledSubnet, subnets, result, ip } = this.state;
    return (
      <div className="container">
        <h1>IP Subnet Calcultor <Icon type="calculator" /></h1>
        <div className="group">
          <label className="title">Network Class</label>
          <RadioGroup onChange={this.onClassChange} value={selectedClass}>
            <Radio value={'ANY'}>ANY</Radio>
            <Radio value={'A'}>A</Radio>
            <Radio value={'B'}>B</Radio>
            <Radio value={'C'}>C</Radio>
          </RadioGroup>
        </div>
        <div className="group">
          <label className="title">Subnet</label>
          <Select
            showSearch
            placeholder="Select IP"
            onChange={this.onSubnetChange}
          >
            {
              subnets.map(net => 
                <Option key={net}>{net}</Option>
              )
            }
          </Select>
        </div>
        <div className="group">
          <label className="title">IP Address</label>
          <Input placeholder="IP Address" onChange={this.onIPChange} value={ip.val} />
        </div>
        { ip.err && <label className="errMessage">invalid ipv4</label> }
        <div className="group">
          <Button 
            type="primary" 
            style={{ width: 280 }} 
            onClick={this.onSubmitCalculate}
          >
            Calculate
          </Button>
        </div>
        <div className="group">
          <Table dataSource={result} columns={columns} pagination={false}></Table>
        </div>
      </div>
    );
  }
}

export default App;
