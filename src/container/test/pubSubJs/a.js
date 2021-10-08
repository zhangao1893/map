import React from 'react';
import PubSub from 'pubsub-js';

export default function a() {
  const onClick = () => {
    PubSub.publish('send', { msg: '这是参数1' }); // 发布消息
  };
  const onClick2 = () => {
    PubSub.publish('send2', { msg: '这是参数2' });
  };
  return (
    <div style={{ border: '1px solid #000' }}>
      <p>A</p>
      <button onClick={onClick}>a中按钮1</button>
      <button onClick={onClick2}>a中按钮2</button>
    </div>
  );
}
