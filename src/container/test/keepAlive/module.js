import React, { useState } from 'react';

export default function module() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <input placeholder="请输入" />
      conut:{count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        +1
      </button>
    </div>
  );
}
