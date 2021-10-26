import React, { Component } from 'react';
// import Scroll from './scroll/index'; // 自动滚动展示组件
// import FaUseSonFn from './faUseSonFn/faUseSonFn';//父组件使用子组件函数
// import ReduxDemo from './redux';//redux
// import EditableTable from './editableTable/editableTable'; // 可编辑表格
// import SimulateTable from './simulateTable/simulateTable'; // div仿table样式
// import RadioTest from './radioTest/radioTest'; // 可取消的单选
// import Map from './mapComponent/map'; // 地图
// import Pdf from './pdf/pdf'; // pdf阅读
// import Ref from './ref/ref'; // ref使用
// import Epub from './epub/epub'; // epub格式电子纸
// import UseEffectAndUseState from './useEffectAndUseState/useEffectAndUseState'; // useState使用出现的问题
// import SetState from './setState/setState';// setState使用出现的问题
// import Chart from './chart/chart'; // 图表
// import ReduxSaga from './reduxSaga/reduxSaga';//redux-saga
// import DynamicForm1 from './dynamicForm/dynamicForm'; // 动态表单
// import DynamicForm2 from './dynamicForm/dynamicForm2';//动态表单2
// import ReactColor from './reactColor/reactColor';//取色器
// import KeepAlive from './keepAlive/keepAlive';protal使用
import ReactDraggable from './reactDraggable/reactDraggable'; // 拖拽
// import Decorator from './decorator/decorator';
// import PubSubJs from './pubSubJs';
import ReactSortableHoc from './react-sortable-hoc'; // 拖拽排序

export default class test extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {/* <h1 style={{ textAlign: 'center' }}>测试</h1> */}
        <ReactSortableHoc />
      </div>
    );
  }
}
