/*
 * @Author: lyf
 * @Date: 2021-01-07 16:33:26
 * @LastEditors: lyf
 * @LastEditTime: 2021-09-14 16:00:20
 * @Description: In User Settings Edit
 * @FilePath: /taro-cloud-demo/Users/a58/iworkspace/js-css-case/src/constants/routes.ts
 *
 * https://reactrouter.com/web/guides/code-splitting
 * https://reacttraining.com/blog/react-router-v5-1/
 */
import { RouteProps } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';
import { ToolOutlined, ApartmentOutlined, DingtalkOutlined } from '@ant-design/icons';
import * as TutorialReact from '../tutorial-react';

interface Platform {
  title: string;
  icon: any;
}

interface Route extends RouteProps {
  title: string;
  hide?: boolean;
}

export interface LocationState {
  rid: string;
  title?: string;
}

export const routes = new Map<string, Route>();
export const platform = new Map<string, Platform>();

// 平台配置
platform.set('1', { title: 'React相关', icon: ToolOutlined });
platform.set('2', { title: 'Antd相关', icon: ApartmentOutlined });
platform.set('3', { title: 'Mobile案例', icon: DingtalkOutlined });

// 路由配置

// react
routes.set('1001', { title: 'hooks引用依赖', path: '/react/case1', component: TutorialReact.TutorialReactCase1 });
routes.set('1002', { title: 'renderProps', path: '/react/case2', component: TutorialReact.TutorialReactCase2 });
routes.set('1003', { title: 'hooks性能优化', path: '/react/case3', component: TutorialReact.TutorialReactCase3 });
routes.set('1004', { title: '基础api', path: '/react/case4', component: TutorialReact.TutorialReactCase4 });

export const ROUTES_CONFIGS = [...routes.entries()].map(([rid, value]) => ({ rid, ...value }));
export const ROUTES_REGEXPS = ROUTES_CONFIGS.map(({ path }) => pathToRegexp(path as string));
export const PLATFORM_CONFIG = [...platform.entries()].map(([pid, value]) => {
  const children = ROUTES_CONFIGS.filter(({ rid }) => rid[0] === pid);
  return { ...value, children, pid };
});
