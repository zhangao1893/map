import React from 'react';
import './chart.less';
import Bar from './bar/bar';
import Line from './line/line';
import Pie from './pie/pie';
import Scatter from './scatter/scatter';
import Bubble from './bubble/bubble';
import Map from './map/map';
import Pie3D from './pie3D/pie3D';
import PieRing from './pieRing/pieRing';
import Bar3D from './bar3D/bar3D';
export default function chart() {
  return (
    <div className="chart">
      <Bar />
      <Line />
      <Pie />
      <Pie3D />
      <PieRing />
      <Scatter />
      <Bubble />
      <Bar3D />
      <Map />
    </div>
  );
}
