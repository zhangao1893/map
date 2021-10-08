import React, { useEffect } from 'react';
import PubSub from 'pubsub-js';
export default function b() {
  useEffect(() => {
    // 订阅消息
    PubSub.subscribe('send', (name, data) => {
      console.log(name); // 消息名
      console.log(data); // 参数
    });
    PubSub.subscribe('send2', (name, data) => {
      console.log(name);
      console.log(data);
    });
    return () => {
      PubSub.unsubscribe('send2'); // 取消指定订阅
      PubSub.clearAllSubscriptions();
    };
  }, []);
  return (
    <div style={{ border: '1px solid #000' }}>
      <p>B</p>
    </div>
  );
}
