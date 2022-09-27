import React, { Component } from 'react';
import { Tabs } from 'antd';

import Scroll from './scroll/index'; // 自动滚动展示组件
import FaUseSonFn from './faUseSonFn/faUseSonFn'; // 父组件使用子组件函数
import ReduxDemo from './redux'; // redux
import EditableTable from './editableTable/editableTable'; // 可编辑表格
import SimulateTable from './simulateTable/simulateTable'; // div仿table样式
import RadioTest from './radioTest/radioTest'; // 可取消的单选
import Map from './mapComponent/map'; // 地图
import Pdf from './pdf/pdf'; // pdf阅读
import Ref from './ref/ref'; // ref使用
import Epub from './epub/epub'; // epub格式电子纸
import UseEffectAndUseState from './useEffectAndUseState/useEffectAndUseState'; // useState使用出现的问题
import SetState from './setState/setState'; // setState使用出现的问题
import Chart from './chart/chart'; // 图表
import ReduxSaga from './reduxSaga/reduxSaga'; // redux-saga
import DynamicForm1 from './dynamicForm/dynamicForm'; // 动态表单
import DynamicForm2 from './dynamicForm/dynamicForm2'; // 动态表单2
import ReactColor from './reactColor/reactColor'; // 取色器
import KeepAlive from './keepAlive/keepAlive'; // protal使用
import ReactDraggable from './reactDraggable/reactDraggable'; // 拖拽
import Decorator from './decorator/decorator';
import PubSubJs from './pubSubJs';
import ReactSortableHoc from './react-sortable-hoc'; // 拖拽排序

export default class test extends Component {
  constructor(props) {
    super();
    this.state = {
      tabKey: '1'
    };
  }

  componentDidMount = () => {
    const search = this.props.location.search;
    if (search) {
      const key = search.split('=')[1];
      console.log(key);
      this.setState({ tabKey: key });
    }
  };

  handlecChange = key => {
    this.setState({ tabKey: key });
    this.props.history.push(`?tabKey=${key}`);
  };

  render() {
    return (
      <div style={{ padding: '0 10px' }}>
        <Tabs
          destroyInactiveTabPane
          activeKey={this.state.tabKey}
          onChange={key => {
            this.handlecChange(key);
          }}>
          <Tabs.TabPane tab="自动滚动" key="1">
            <Scroll />
          </Tabs.TabPane>
          <Tabs.TabPane tab="FaUseSonFn" key="2">
            <FaUseSonFn />
          </Tabs.TabPane>
          <Tabs.TabPane tab="ReduxDemo" key="3">
            <ReduxDemo />
          </Tabs.TabPane>
          <Tabs.TabPane tab="可编辑表格" key="4">
            <EditableTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="SimulateTable" key="5">
            <SimulateTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="可取消单选" key="6">
            <RadioTest />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Map" key="7">
            <Map />
          </Tabs.TabPane>
          <Tabs.TabPane tab="pdf阅读" key="8">
            <Pdf />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Ref使用" key="9">
            <Ref />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Epub电子书" key="10">
            <Epub />
          </Tabs.TabPane>
          <Tabs.TabPane tab="UseEffectAndUseState" key="11">
            <UseEffectAndUseState />
          </Tabs.TabPane>
          <Tabs.TabPane tab="SetState" key="12">
            <SetState />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chart" key="13">
            <Chart />
          </Tabs.TabPane>
          <Tabs.TabPane tab="ReduxSaga" key="14">
            <ReduxSaga />
          </Tabs.TabPane>
          <Tabs.TabPane tab="DynamicForm1" key="15">
            <DynamicForm1 />
          </Tabs.TabPane>
          <Tabs.TabPane tab="DynamicForm2" key="16">
            <DynamicForm2 />
          </Tabs.TabPane>
          <Tabs.TabPane tab="ReactColor" key="17">
            <ReactColor />
          </Tabs.TabPane>
          <Tabs.TabPane tab="KeepAlive" key="18">
            <KeepAlive />
          </Tabs.TabPane>
          <Tabs.TabPane tab="ReactDraggable" key="19">
            <ReactDraggable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Decorator" key="20">
            <Decorator />
          </Tabs.TabPane>
          <Tabs.TabPane tab="PubSubJs" key="21">
            <PubSubJs />
          </Tabs.TabPane>
          <Tabs.TabPane tab="ReactSortableHoc" key="22">
            <ReactSortableHoc />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}
