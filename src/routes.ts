/*
 * @Author: lyf
 * @Date: 2021-02-01 10:46:39
 * @LastEditors: lyf
 * @LastEditTime: 2021-03-15 19:17:53
 * @Description: In User Settings Edit
 * @FilePath: /cook-electron/Users/a58/iworkspace/js-css-case/src/routes.ts
 */
import { RouteProps } from 'react-router-dom'
import * as tutorialReact from './tutorial-react'

export const routes = new Map<string, RouteProps>()

// 1. tutorial-react
routes.set('1001', { path: '/react/case1', component: tutorialReact.Case1, exact: true })
routes.set('1002', { path: '/react/case2', component: tutorialReact.Case2, exact: true })
routes.set('1003', { path: '/react/case3', component: tutorialReact.Case3, exact: true })
