import React, { Component } from 'react';
// import Scroll from './scroll/index'; // 自动滚动展示组件
// import FaUseSonFn from './faUseSonFn/faUseSonFn';//父组件使用子组件函数
// import ReduxDemo from './redux';//redux
// import EditableTable from './editableTable/editableTable';//可编辑表格
// import SimulateTable from './simulateTable/simulateTable'; // div仿table样式
// import RadioTest from './radioTest/radioTest'; // 可取消的单选
// import Map from './mapComponent/map'; // 地图
import Chart from './chart/chart';
export default class test extends Component {
  render() {
    return (
      <div>
        {/* <h1 style={{ textAlign: 'center' }}>测试</h1> */}
        <Chart />
      </div>
    );
  }
}
