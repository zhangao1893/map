import React, { useEffect } from 'react';

export default function decorator() {
  useEffect(() => {
    a();
    b();
  }, []);

  // 写一个为类实例添加say方法的修饰器
  const a = () => {
    function sayable(target) {
      target.prototype.say = function (message) {
        console.log(message);
      };
    }

    @sayable
    class Person {}

    var person = new Person();
    person.say('good bye'); // "good bye"
  };

  // 写一个计算方法执行时间的修饰器
  const b = () => {
    function testable(target, name, descriptor) {
      // console.log(target); // 一个对象
      // console.log(name); // countStars
      // console.log(descriptor); // 一个对象
      // const oldValue = descriptor.value;
      console.log('前');
      const beginTime = new Date();
      descriptor.value();
      const endTime = new Date();
      const wasteTime = endTime.getTime() - beginTime.getTime();
      console.log('wasteTime', wasteTime);
      // descriptor.value = function () {
      // const beginTime = new Date();
      // const result = oldValue.apply(null, arguments);
      // const endTime = new Date();
      // const wasteTime = endTime.getTime() - beginTime.getTime();
      // console.log(`执行方法'${name}'花了${wasteTime} ms`, arguments, result);
      // return result;
      // };
    }
    class Person {
      @testable
      countStars(num) {
        for (var i = 0; i < num; i++) {
          console.log(`第${i}个星星`);
        }
      }
    }

    var haofeng = new Person();
    haofeng.countStars(10000); // 数10000个星星试试?
  };

  return <div>测试修饰器</div>;
}
