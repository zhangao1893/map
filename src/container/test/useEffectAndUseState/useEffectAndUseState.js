import React, { useState, useEffect } from 'react';

export default function useEffectAndUseState() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  /*
  无效,当effect执行时，会创建一个闭包，并将count的值被保存在该闭包当中，且初值为0。
  每隔一秒，回调就会执行setCount(0 + 1)，因此，count永远不会超过 1。
  */
  //   useEffect(() => {
  //     const id = setInterval(() => {
  //       setCount(count + 1);
  //     }, 1000);
  //     return () => clearInterval(id);
  //   }, []);

  /*
  函数式更新，有效
  */
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handle = () => {
    /*
    1.设置是异步的
    */
    // setCount2(count2 + 1);
    // console.log(count2); // 0，1，2
    /*
    2.放在定时器内还是异步的
    */
    setTimeout(() => {
      setCount2(count2 + 1);
      console.log(count2); // 0，1，2
    }, 0);
    /*
    3.普通更新，后面的依赖不到前面state。
     一个周期内批处理，相当于Object.assign,用函数式更新可以解决和class中setState一样
     页面2，4，6，打印0，2，4
    */
    // setCount2(count2 + 1);
    // setCount2(count2 + 2);
    // console.log(count2); // 0，2，4
    /*
    4.函数式更新，可以依赖之前state，页面正常更新成3，6，9，打印0，3，6
    */
    // setCount2(count2 => count2 + 1);
    // setCount2(count2 => count2 + 2);
    // console.log(count2); // 0,3,6
    /*
    5.延迟打印的是设置定时器之前的state状态（组件内部的任何函数，包括事件
      处理函数和 effect，都是从它被创建的那次渲染中被「看到」的。如果你刻
      意地想要从某些异步回调中读取 最新的 state，你可以用 一个 ref 来保存它，修改它，并从中读取。）
    */
    // setCount2(count2 + 1);
    // setTimeout(() => {
    //   console.log(count2); // 0，1，2
    // }, 2000);
    /*
    6.    1）这样count2确实是改变了的，且同步,连续点击打印1，2，3，但是不会渲染没有意义。
          2）如果其他地方更新了状态，页面有更新，count会重新从1开始打印。
    */
    // count2 = count2 + 1;
    // console.log(count2); // 1,2,3
  };

  return (
    <div>
      count:{count}
      <div>加</div>
      <hr />
      conut2:{count2}
      <button onClick={handle}>按钮+</button>
    </div>
  );
}
