import React, { useState } from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { ROUTES_CONFIGS, ROUTES_REGEXPS, LocationState } from '@constants/routes';
import LayoutContent from './content';
import MenuBar from './side-bar';
import './index.scss';

const { Sider, Content } = Layout;

const DEFAULT_RID = ROUTES_CONFIGS[0].rid;

const App = () => {
  const location = useLocation<LocationState>();
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = location;
  let { state } = location;

  if (!state && ROUTES_CONFIGS.length > 0) {
    let rid = DEFAULT_RID;
    if (pathname !== '/') {
      const targetIndex = ROUTES_REGEXPS.findIndex((regexp) => regexp.test(pathname));
      if (targetIndex > -1) {
        const config = ROUTES_CONFIGS[targetIndex] || {};
        rid = config.rid || DEFAULT_RID;
      }
    }
    state = { rid };
  }

  if (state.rid[0] === 'a') {
    return <LayoutContent />;
  }
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(collapsed) => setCollapsed(collapsed)}>
        <MenuBar data={state} />
      </Sider>
      <Content style={{ padding: 15 }}>
        <LayoutContent />
      </Content>
    </Layout>
  );
};

export default App;
