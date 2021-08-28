import React from 'react';

export default function two(props) {
  const { moduleItem, onResetPosition, onClose } = props;
  return (
    <div className="module module2">
      <div className={`top draggable-${moduleItem.id}`} onDoubleClick={onResetPosition}>
        头部二
        <span className="close" onClick={onClose}>
          X
        </span>
      </div>
      <div className="content">内容二</div>
    </div>
  );
}
