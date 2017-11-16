import React, { Component } from 'react';
import { 
  Input,
  Icon,
  Radio,
  Select
} from 'antd';

import { generateSubnetByClass } from './utils/helper';
import './App.css';

const RadioGroup = Radio.Group;
const Option = Select.Option;

class App extends Component {
  state = {
    selectedClass: 'ANY',
    selectledSubnet: null,    
    subnets: generateSubnetByClass('ANY'),
  }
  
  onClassChange = e => {
    this.setState({
      selectedClass: e.target.value,
      subnets: generateSubnetByClass(e.target.value)
    });
  }

  onSubnetChange = subnet => {
    this.setState({
      selectledSubnet: +subnet.slice(-2)
    })
  }

  render() {
    const { selectedClass, selectledSubnet, subnets } = this.state;
    console.log(selectledSubnet)
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
          <Input placeholder="IP Address" />
        </div>
      </div>
    );
  }
}

export default App;
