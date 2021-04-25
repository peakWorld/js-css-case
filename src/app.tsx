import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { HashRouter as Router, Switch } from 'react-router-dom';
import Layout from '@components/layout';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import './app.scss';

const renderApp = () => {
  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Layout />
        </Switch>
      </Router>
    </ConfigProvider>,
    document.getElementById('app'),
  );
};

/* eslint-disable */
if ((module as any).hot) {
  (module as any).hot.accept();
}
/* eslint-enable */

renderApp();
