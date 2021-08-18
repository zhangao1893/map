import React, { useState } from 'react';
import Conditional from './conditional';
import Module from './module';
export default function keepAlive() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        显示/隐藏
      </button>
      <hr />
      <Conditional active={show}>
        <Module />
      </Conditional>
    </div>
  );
}
