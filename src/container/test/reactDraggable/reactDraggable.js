import React, { useState, useEffect } from 'react';
import './reactDraggable.less';
import One from './module/one';
import Two from './module/two';
import Three from './module/three';
import config from './config';
import Draggable from 'react-draggable'; // 拖拽
import { onAnime } from './service'; // 子模块动画服务

export default function reactDraggable() {
  const [configData, setConfigData] = useState([]);
  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    setConfigData(config);
  }, []);

  // 点导航
  const handleClick = single => {
    if (single.show) return;
    single.show = true;
    single.iconActive = true;
    setConfigData([...configData]);
    onAnime(single);
  };

  // 控制z-index
  const handleZIndex = single => {
    single.style = { ...single.style, zIndex: zIndex + 1 };
    setConfigData([...configData]);
    setZIndex(zIndex + 1);
  };

  // 渲染模块
  const getsubContent = item => {
    // 双击还原位置函数
    const onResetPosition = () => {
      handleReset(item);
    };
    // 关闭函数
    const onClose = () => {
      handleClose(item);
    };
    // 公共属性
    const commonProps = {
      onResetPosition,
      onClose
    };
    if (item.id === 1) return <One moduleItem={item} {...commonProps} />;
    if (item.id === 2) return <Two moduleItem={item} {...commonProps} />;
    if (item.id === 3) return <Three moduleItem={item} {...commonProps} />;
  };

  // 双击还原位置
  const handleReset = item => {
    const { x, y } = item.position;
    // 位置未发生改变
    if (x === 0 && y === 0) return;
    // 计算重置位置所的动画时间
    const maxNum = Math.max(Math.abs(x), Math.abs(y));
    let duration = Math.floor(maxNum);
    // 重置位置延迟动画duration
    duration = duration > 300 ? 300 : duration;
    item.position = { x: 0, y: 0 };
    item.style = {
      ...item.style,
      transition: `transform ${duration}ms ease-in-out`
    };
    setConfigData([...configData]);
    // 归位后取消transform动画
    setTimeout(() => {
      item.style = {
        ...item.style,
        transition: `transform 0ms ease-in-out`
      };
      setConfigData([...configData]);
    });
  };

  // 关闭
  const handleClose = item => {
    item.show = false;
    item.iconActive = false;
    onAnime(item, () => {
      setConfigData([...configData]);
    });
  };

  // 停止拖拽
  const handleStop = (data, item) => {
    item.position = { ...data };
    setConfigData([...configData]);
  };

  return (
    <div className="reactDraggable">
      <div className="left">
        {configData.map(item => {
          return (
            <div
              key={item.id}
              className="sub"
              onMouseDown={() => {
                handleZIndex(item);
              }}>
              {/* 左侧导航 */}
              <div
                className={item.iconActive ? 'title active' : 'title'}
                onClick={() => {
                  handleClick(item);
                }}>
                {item.title}
              </div>
              {/* 弹出框 ，定义了position属性和onStop事件，使之位置受控 */}
              {/* handle属性控制拖拽的点击范围 */}
              <Draggable
                handle={`.draggable-${item.id}`}
                position={item.position}
                bounds={`.reactDraggable`}
                onStop={(e, data) => handleStop(data, item)}>
                <div id={item.id} className="subContent" style={item.style}>
                  {item.show ? getsubContent(item) : null}
                </div>
              </Draggable>
            </div>
          );
        })}
      </div>
      <div className="right">右侧内容</div>
    </div>
  );
}
