import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PersonalCenter from "../views/personalCenter"; //引入的组件
import Header from "../layout/header"//引入router.js
const BasicRoute = () => (
 
  <BrowserRouter>
    <Switch>
      <Header>
        <Route exact path="/personalCenter/:id?" component={PersonalCenter} />
      </Header>
      {/*//定义路由地址*/}
    </Switch>
  </BrowserRouter>
);

export default BasicRoute;