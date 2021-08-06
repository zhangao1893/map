import React, { Component } from 'react';
// import Scroll from './scroll/index'; // 自动滚动展示组件
// import FaUseSonFn from './faUseSonFn/faUseSonFn';//父组件使用子组件函数
// import ReduxDemo from './redux';//redux
// import EditableTable from './editableTable/editableTable';//可编辑表格
// import SimulateTable from './simulateTable/simulateTable'; // div仿table样式
// import RadioTest from './radioTest/radioTest'; // 可取消的单选
// import Map from './mapComponent/map'; // 地图
// import Pdf from './pdf/pdf'; // pdf阅读
// import Ref from './ref/ref'; // ref使用
// import Epub from './epub/epub'; // epub格式电子纸
// import UseEffectAndUseState from './useEffectAndUseState/useEffectAndUseState';
// import Chart from './chart/chart'; // 图表
import ReduxSaga from './reduxSaga/reduxSaga';

export default class test extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {/* <h1 style={{ textAlign: 'center' }}>测试</h1> */}
        <ReduxSaga />
      </div>
    );
  }
}
