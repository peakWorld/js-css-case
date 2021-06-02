/*
 * @Author: lyf
 * @Date: 2021-04-25 10:12:54
 * @LastEditors: lyf
 * @LastEditTime: 2021-05-12 14:41:23
 * @Description: 基础api
 * @FilePath: /taro-cloud-demo/Users/a58/iworkspace/js-css-case/src/tutorial-react/case4/index.tsx
 */
import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Test, { Handlers } from './test';
import './index.scss';

const Case4 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<Handlers>(null);

  useEffect(() => {
    ReactDOM.render(<div>Hello world !!!</div>, ref.current);

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(ref.current as HTMLDivElement);
    }, 2000);
  }, []);

  const handleClick = () => {
    ref2.current?.onChange(Math.random());
  };

  return (
    <div className="lucky-draw">
      <div ref={ref}></div>
      <Test ref={ref2}>haha!!!</Test>
      <button onClick={handleClick}>控制子组建33</button>
    </div>
  );
};

export default Case4;
