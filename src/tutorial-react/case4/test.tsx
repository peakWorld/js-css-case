/*
 * @Author: lyf
 * @Date: 2021-04-29 17:12:17
 * @LastEditors: lyf
 * @LastEditTime: 2021-04-29 17:29:29
 * @Description: In User Settings Edit
 * @FilePath: /taro-cloud-demo/Users/a58/iworkspace/js-css-case/src/tutorial-react/case4/test.tsx
 */
import React, { ReactNode, useEffect, useState, ReactPortal, forwardRef, useImperativeHandle, Ref } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: ReactNode;
}

export interface Handlers {
  onChange(v: number): void;
}

const Test = ({ children }: Props, ref: Ref<Handlers>) => {
  const [portal, setPortal] = useState<ReactPortal>();
  const [state, setState] = useState(0);
  useEffect(() => {
    setPortal(ReactDOM.createPortal(children, document.body));
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      onChange(value: number) {
        setState(value);
      },
    }),
    [],
  );

  return (
    <div>
      {portal}
      <input value={state} />
    </div>
  );
};

export default forwardRef(Test);
