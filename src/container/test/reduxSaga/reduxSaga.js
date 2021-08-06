import React, { useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';

function reduxSaga(props) {
  console.log(props);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'testReduxSaga/getList',
      payload: { id: 1 }
    });
    setTimeout(() => {
      dispatch({
        type: 'testReduxSaga/getList',
        payload: { id: 2 }
      });
    }, 3000);
  }, []);
  return (
    <React.Fragment>
      {props.data.map(item => {
        return (
          <div key={item.id} style={{ display: 'flex' }}>
            <div>{item.id}</div>
            <div>{item.text}</div>
          </div>
        );
      })}
    </React.Fragment>
  );
}
export default connect(state => {
  console.log(state.testReduxSaga);
  return state.testReduxSaga;
})(reduxSaga);
