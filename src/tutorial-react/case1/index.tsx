/*
 * @Author: lyf
 * @Date: 2021-02-23 17:40:50
 * @LastEditors: lyf
 * @LastEditTime: 2021-04-22 20:06:18
 * @Description: hooks的deps是对象的情况
 * @FilePath: /js-css-case/src/tutorial-react/case1/index.tsx
 */
import React, { useState, useEffect } from 'react';

const Case1 = () => {
  const [_, setTime] = useState(Date.now());
  const [state, setState] = useState({ x: 1, y: 2 });

  useEffect(() => {
    console.log('useEffect...');
  }, [state]); // deps中的值包含引用类型, 改变引用对象中键的值, 不会触发effect回调函数执行; 改变引用的对象, 才会触发effect回调函数执行

  const handleTime = () => {
    state.x += 1;
    setTime(Date.now());
  };

  console.log('state', state);
  return (
    <div>
      {_}
      <span>x: {state.x}</span>
      <span>y: {state.y}</span>
      <button onClick={() => setState((state) => ({ ...state, x: state.x + 1 }))}>x加一</button>
      <button onClick={handleTime}>变化6</button>
    </div>
  );
};

export default Case1;
