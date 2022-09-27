import React from 'react';
const Index = props => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>首页</h1>
      <a
        onClick={() => {
          props.history.push('/test');
        }}>
        事例
      </a>
    </div>
  );
};
export default Index;
