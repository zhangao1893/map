import React from 'react';
import './chart.less';
import Bar from './bar/bar';
import Line from './line/line';
import Pie from './pie/pie';
import Scatter from './scatter/scatter';
import Bubble from './bubble/bubble';
import Map from './map/map';
export default function chart() {
  return (
    <div className="chart">
      <Bar />
      <Line />
      <Pie />
      <Scatter />
      <Bubble />
      <Map />
    </div>
  );
}
