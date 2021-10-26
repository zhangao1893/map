import React from 'react';
import A from './a';
import B from './b';
console.log(window.cache);
export default function index() {
  return (
    <div>
      <A />
      <B />
    </div>
  );
}
