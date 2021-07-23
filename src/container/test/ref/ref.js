import React, { Component } from 'react';
import Son from './son';
export default class ref extends Component {
  constructor() {
    super();
    this.Ref = React.createRef();
    this.aaa = this.aaa.bind(this);
  }

  aaa() {
    this.Ref.current.fn();
    console.log(this.Ref.current);
  }

  render() {
    return (
      <div>
        <div>
          <div onClick={this.aaa}>父亲</div>
          <Son ref={this.Ref} />
        </div>
      </div>
    );
  }
}
