import React, { Component } from 'react';

export default class test extends Component {
  constructor(props) {
    super();
    this.state = {
      cc: '123'
    };
  }

  fn() {
    this.setState({ cc: '456' });
  }

  render() {
    return (
      <div>
        <div>儿子</div>
        <div>{this.state.cc}</div>
      </div>
    );
  }
}
