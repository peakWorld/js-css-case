import React, { useState, Suspense } from 'react';
import { Layout } from 'antd';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import { ROUTES_CONFIGS, ROUTES_REGEXPS, LocationState } from '@constants/routes';
import Loading from '@components/loading';
import MenuBar from './side-bar';
import './index.scss';

const { Sider, Content } = Layout

const DEFAULT_RID = ROUTES_CONFIGS[0].rid

const App = () => {
  const location = useLocation<LocationState>();
  const [collapsed, setCollapsed] = useState(false);
  let { state, pathname } = location;
  
  if (!state && ROUTES_CONFIGS.length > 0) {
    let rid = DEFAULT_RID
    if (pathname !== '/') {
      const targetIndex = ROUTES_REGEXPS.findIndex((regexp) => regexp.test(pathname))
      if (targetIndex > -1) {
        const config = ROUTES_CONFIGS[targetIndex] || {}
        rid = config.rid || DEFAULT_RID
      }
    }
    state = { rid }
  }

  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <MenuBar data={state}/>
      </Sider>
      <Content style={{ padding: 15 }}>
        <Suspense fallback={<Loading />}>
          <Switch>
            {ROUTES_CONFIGS.map(({ rid, ...props }) => <Route key={rid} {...props} />)}
            <Redirect from="/" to={{ pathname: ROUTES_CONFIGS[0].path as string, state: { rid: DEFAULT_RID } }}/>
          </Switch>
        </Suspense>
      </Content>
    </Layout>
  )
}

export default App
