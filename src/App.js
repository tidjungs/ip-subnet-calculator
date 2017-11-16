import React, { Component } from 'react';
import { 
  Input,
  Icon
} from 'antd';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>IP Subnet Calcultor <Icon type="calculator" /></h1>
        <label>IP Address</label>
        <Input placeholder="IP Address" />        
      </div>
    );
  }
}

export default App;
