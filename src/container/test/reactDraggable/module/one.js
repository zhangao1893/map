import React from 'react';

export default function one(props) {
  const { moduleItem, onResetPosition, onClose } = props;
  return (
    <div className="module module1">
      <div className={`top draggable-${moduleItem.id}`} onDoubleClick={onResetPosition}>
        头部一
        <span className="close" onClick={onClose}>
          X
        </span>
      </div>
      <div className="content">内容一</div>
    </div>
  );
}
