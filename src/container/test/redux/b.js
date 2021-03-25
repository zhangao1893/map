import React from 'react';
import { connect } from 'react-redux';

function b(props) {
  return (
    <div style={{ height: '200px', border: '1px solid green', width: '80%', margin: '50px auto' }}>b {props.count}</div>
  );
}
export default connect(state => {
  return { count: state.myTest.count };
})(b);
