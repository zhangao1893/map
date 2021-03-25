import React, { useState } from 'react';

export default function son(props) {
  const { FaFn } = props;
  const [count, setCount] = useState('空');

  const onChange = e => {
    FaFn(e.target.value, setCount);
  };
  return (
    <div className="son">
      <h2>子</h2>
      {count}
      <input onChange={onChange} />
    </div>
  );
}
