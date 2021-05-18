import React, { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { BuilderPage, FormPage, HomePage } from './pages';
import 'antd/dist/antd.css';

export const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/form" exact={true} component={FormPage} />
      <Route path="/builder" exact={true} component={BuilderPage} />
    </Switch>
  </BrowserRouter>
);
