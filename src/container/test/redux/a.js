import React from 'react';
import { connect } from 'react-redux';

function a(props) {
  return (
    <div style={{ height: '200px', border: '1px solid green', width: '80%', margin: '0 auto' }}>a {props.count}</div>
  );
}
export default connect(state => {
  return { count: state.myTest.count };
})(a);
