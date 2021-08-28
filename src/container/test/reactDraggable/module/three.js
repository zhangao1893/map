import React from 'react';

export default function three(props) {
  const { moduleItem, onResetPosition, onClose } = props;

  return (
    <div className="module module3">
      <div className={`top draggable-${moduleItem.id}`} onDoubleClick={onResetPosition}>
        头部三
        <span className="close" onClick={onClose}>
          X
        </span>
      </div>
      <div className="content">内容三</div>
    </div>
  );
}
