import React, { Component } from 'react';

export default class setState extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      count2: 0
    };
    this.handle = this.handle.bind(this);
  }

  componentDidMount() {
    /*
     1.能够正常更新，且打印的和显示的一样，setState在定时器中变为同步
    */
    // setInterval(() => {
    //   this.setState({ count: this.state.count + 1 });
    //   console.log(this.state.count); // 1,2,3
    // }, 1000);
    /*
     2.定时器中多个setState没有合并，且为同步
    */
    // setTimeout(() => {
    //   this.setState({ count: this.state.count + 1 });
    //   this.setState({ count: this.state.count + 1 });
    //   console.log(this.state.count); // 页面显示2，打印2
    // }, 1000);
    /*
     3.setState合并了，且为异步
    */
    // this.setState({ count: this.state.count + 1 });
    // this.setState({ count: this.state.count + 1 });
    // console.log(this.state.count); // 页面显示1，打印0
    /*
     4.在异步执行的情况下，我还想拿到上一次setState执行完后的
      结果，react给我们提供了方式，就是在setState()里面传入一个函数
    */
    // this.setState((prevState, props) => {
    //   return { count: prevState.count + 1 };
    // });
    // this.setState((prevState, props) => {
    //   return { count: prevState.count + 1 };
    // });
    // console.log(this.state.count); // 页面显示2，打印0
  }

  handle() {
    /*
     1.能够正常更新，且打印的和显示的一样，setState在定时器中变为同步
    */
    // setInterval(() => {
    //   this.setState({ count2: this.state.count2 + 1 });
    //   console.log(this.state.count2); // 1,2,3
    // }, 1000);
    /*
     2.定时器中多个setState没有合并，且为同步
    */
    // setTimeout(() => {
    //   this.setState({ count2: this.state.count2 + 1 });
    //   this.setState({ count2: this.state.count2 + 1 });
    //   console.log(this.state.count2); // 页面显示2，打印2
    // }, 1000);
    /*
     3.setState合并了，且为异步
    */
    // this.setState({ count2: this.state.count2 + 1 });
    // this.setState({ count2: this.state.count2 + 1 });
    // console.log(this.state.count2); // 页面显示1，打印0
  }

  render() {
    const { count, count2 } = this.state;
    return (
      <div>
        count:{count}
        <div>加</div>
        <hr />
        conut2:{count2}
        <button onClick={this.handle}>按钮+</button>
      </div>
    );
  }
}
