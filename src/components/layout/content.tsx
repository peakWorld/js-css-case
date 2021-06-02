/*
 * @Author: lyf
 * @Date: 2021-04-25 10:20:01
 * @LastEditors: lyf
 * @LastEditTime: 2021-05-12 15:14:03
 * @Description: In User Settings Edit
 * @FilePath: /taro-cloud-demo/Users/a58/iworkspace/js-css-case/src/components/layout/content.tsx
 */
import React, { Suspense } from 'react';
import Loading from '@components/loading';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ROUTES_CONFIGS } from '@constants/routes';

const DEFAULT_RID = ROUTES_CONFIGS[0].rid;

const LayoutContent = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      {ROUTES_CONFIGS.map(({ rid, ...rest }) => {
        if (rid[0] === '3') {
          const { component } = rest;
          const Comp = component as any;
          return (
            <Route
              key={rid}
              exact
              path={rest.path}
              render={(routeProps) => (
                <div className="mobile-simulate">
                  <Comp {...routeProps} />
                </div>
              )}
            />
          );
        }
        return <Route key={rid} exact {...rest} />;
      })}
      <Redirect from="/" to={{ pathname: ROUTES_CONFIGS[0].path as string, state: { rid: DEFAULT_RID } }} />
    </Switch>
  </Suspense>
);

export default LayoutContent;
