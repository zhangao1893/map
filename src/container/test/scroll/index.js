import React from 'react';
import './index.less';
import Scroll from './scroll';
export default function index() {
  return (
    <div>
      <Scroll containerID="box" scrollID="inner">
        <div id="box">
          <div id="inner">
            <div className="content">
              <p>一</p>
              <p>二</p>
              <p>三</p>
              <p>四</p>
              <p>五</p>
              <p>六</p>
              <p>七</p>
              <p>八</p>
              <p>九</p>
              <p>十</p>
              <p>十1</p>
              <p>十2</p>
              <p>十3</p>
              <p>十4</p>
            </div>
          </div>
        </div>
      </Scroll>
      <Scroll containerID="box2" scrollID="inner2">
        <div id="box2">
          <div id="inner2">
            <div className="content">
              <p>一</p>
              <p>二</p>
              <p>三大法官的双方各</p>
              <p>四</p>
              <p>五</p>
              <p>六山东分公司答复个</p>
              <p>七</p>
              <p>八</p>
              <p>九</p>
              <p>十</p>
              <p>十1</p>
              <p>十2</p>
              <p>十3</p>
              <p>十4</p>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
  );
}
