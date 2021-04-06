import React, { Component } from 'react';
import Scroll from './scroll/index';
import FaUseSonFn from './faUseSonFn/faUseSonFn';
import ReduxDemo from './redux';
import EditableTable from './editableTable/editableTable';
export default class test extends Component {
  render() {
    return (
      <div>
        {/* <h1 style={{ textAlign: 'center' }}>测试</h1> */}
        <EditableTable />
      </div>
    );
  }
}
