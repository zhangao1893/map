'use strict';
/**
 * Created by weiChow on 2020/06/30.
 * 组件按需加载
 */

import React from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { component: null };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({ component });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
