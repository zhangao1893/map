import React from 'react';
import { connect } from 'react-redux';
import A from './a';
import B from './b';
function Index(props) {
  return (
    <div style={{ height: '500px', border: '1px solid red' }}>
      <p>外层</p>
      {props.count}
      <button
        onClick={() => {
          props.dispatch({
            type: 'myTest/getCount',
            payload: { count: props.count + 1 }
          });
        }}>
        +1
      </button>
      <A>123</A>
      <B />
    </div>
  );
}
export default connect(state => {
  return { count: state.myTest.count };
})(Index);
