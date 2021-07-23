import React, { useState, useEffect } from 'react';

export default function useEffectAndUseState() {
  const [count, setCount] = useState(0);
  // 无效 当 effect 执行时，我们会创建一个闭包，并将 count 的值被保存在该闭包当中，且初值为 0。
  // 每隔一秒，回调就会执行 setCount(0 + 1)，因此，count 永远不会超过 1。
  //   useEffect(() => {
  //     const id = setInterval(() => {
  //       setCount(count + 1);
  //     }, 1000);
  //     return () => clearInterval(id);
  //   }, []);

  // 函数式更新，有效
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      count:{count}
      <div>加</div>
    </div>
  );
}
