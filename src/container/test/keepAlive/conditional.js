import React, { useState, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

const Conditional = props => {
  const [targetElement] = useState(() => document.createElement('div'));
  const containerRef = useRef();

  // 增加一个 ref 记录组件是否“被激活过”
  const activatedRef = useRef(false);
  activatedRef.current = activatedRef.current || props.active;

  useLayoutEffect(() => {
    if (props.active) {
      containerRef.current.appendChild(targetElement);
    } else {
      try {
        containerRef.current.removeChild(targetElement);
      } catch (e) {}
    }
  }, [props.active]);

  return (
    <>
      <div ref={containerRef} />
      {activatedRef.current && // 如果“被激活过”，才渲染 children
        ReactDOM.createPortal(props.children, targetElement)}
    </>
  );
};
export default Conditional;
