import React from 'react';
import Son from './son';
import './faUseSonFn.less';
export default function faUseSonFn() {
  const FaFn = (val, callBack) => {
    if (callBack && callBack instanceof Function) {
      callBack(val);
    }
  };

  return (
    <div className="fa">
      <h1>父</h1>
      <Son FaFn={FaFn} />
    </div>
  );
}
