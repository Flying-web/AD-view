import React, { Component } from 'react';

import './App.css';
import Router from "./router"//引入router.js
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

class App extends Component {
  componentDidMount() {
    console.log(window.location.pathname)
    if (window.location.pathname.split('/')[1] !== 'personalCenter') {
      window.location.href = 'http://www.121media.cn/'
    }
  }
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router />
      </ConfigProvider>
    )
  }
}

export default App;
