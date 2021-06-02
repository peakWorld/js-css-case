/*
 * @Author: lyf
 * @Date: 2021-05-12 14:43:57
 * @LastEditors: lyf
 * @LastEditTime: 2021-05-13 17:31:46
 * @Description: 抽奖
 * @FilePath: /taro-cloud-demo/Users/a58/iworkspace/js-css-case/src/tutorial-react/draw/index.tsx
 */
import React, { useState, useRef, useEffect } from 'react';
// import fetch from '@utils/fetch';
// import { getCurrentStyle } from '@utils/dom';
import './index.scss';

interface DrawProps {
  canDraw: boolean;
}

const Draw = ({ canDraw = true }: DrawProps) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [deg, setDeg] = useState(0);

  useEffect(() => {
    const step = 2;
    if (rotating) {
      setInterval(() => {
        setDeg((deg) => deg + step);
      }, 50);
    }

    const a: string = 12;
  }, [rotating]);

  const handleBeginDraw = async (drawNum: number) => {
    console.log('drawNum', drawNum);
    if (!canDraw || drawing) {
      return;
    }
    setDrawing(true);
    btnRef.current?.classList.add('isDrawing'); // 按钮动画开始
    await Promise.race([new Promise((resolve) => setTimeout(resolve, 800)), new Promise((resolve) => setTimeout(resolve, 2000))]);
  };

  const onBtnIteration = () => {
    // 按钮动画结束
    btnRef.current?.classList.remove('isDrawing');
    // 转盘动画开始
    setRotating(true);
  };

  return (
    <div className="draw">
      <div className="draw-bg" ref={bgRef} style={{ transform: `rotate(${deg}deg)` }}></div>
      <div className="draw-pointer" onClick={() => handleBeginDraw(1)} ref={btnRef} onAnimationIteration={onBtnIteration}></div>
      <div className="draw-btns">
        <div onClick={() => handleBeginDraw(1)}>单抽</div>
        <div onClick={() => handleBeginDraw(10)}>10抽</div>
        <div onClick={() => handleBeginDraw(30)}>30抽</div>
      </div>
    </div>
  );
};

export default Draw;
