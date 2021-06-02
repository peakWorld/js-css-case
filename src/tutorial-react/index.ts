/*
 * @Author: lyf
 * @Date: 2021-02-23 17:40:43
 * @LastEditors: lyf
 * @LastEditTime: 2021-05-12 14:45:21
 * @Description: In User Settings Edit
 * @FilePath: /taro-cloud-demo/Users/a58/iworkspace/js-css-case/src/tutorial-react/index.ts
 */
import { lazy } from 'react';

export const TutorialReactCase1 = lazy(() => import(/* webpackChunkName: "TutorialReactCase1" */ './case1'));
export const TutorialReactCase2 = lazy(() => import(/* webpackChunkName: "TutorialReactCase2" */ './case2'));
export const TutorialReactCase3 = lazy(() => import(/* webpackChunkName: "TutorialReactCase3" */ './case3'));
export const TutorialReactCase4 = lazy(() => import(/* webpackChunkName: "TutorialReactCase4" */ './case4'));

export const MobileDraw = lazy(() => import(/* webpackChunkName: "MobileDraw" */ './draw'));
