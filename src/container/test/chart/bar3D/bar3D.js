import React, { useEffect } from 'react';
import highcharts from 'highcharts/highstock';
import highCharts3D from 'highcharts/highcharts-3d';
highCharts3D(highcharts);

const TransCyConfig = {
  chart: {
    type: 'column',
    options3d: { enabled: true, alpha: 10, beta: 5, viewDistance: 20 },
    backgroundColor: 'transparent',
    spacingBottom: 30,
    marginLeft: 35
  },
  legend: { enabled: false },
  credits: { enabled: false },
  title: { text: 'bar3D Highcharts' },
  xAxis: {
    field: 'name',
    categories: ['伤残', '病故', '因公牺牲', '烈士'],
    gridLineColor: 'rgba(14, 156, 255, 0.15)',
    labels: { style: { color: 'rgba(7, 139, 185, 1)', fontSize: 14.19 } }
  },
  yAxis: {
    allowDecimals: false,
    min: 0,
    title: {
      align: 'high',
      text: '',
      rotation: '0',
      x: 30,
      y: -30,
      style: { color: 'rgba(7, 139, 185, 1)', fontSize: 14.19 }
    },
    gridLineColor: 'rgba(14, 156, 255, 0.15)',
    labels: { style: { color: 'rgba(7, 139, 185, 1)', fontSize: 14.19 } }
  },
  tooltip: { style: { fontSize: 14.19 }, headerFormat: '<span style="font-size: 14.19px">{point.key}</span><br/>' },
  // stacking 不堆叠设为null    depth柱长  pointWidth柱宽
  plotOptions: { column: { stacking: 'normal', depth: 38.38, pointWidth: 28.38 } },
  series: [
    {
      name: 'A',
      // stack: 'sj',
      data: [
        { y: 37, color: 'rgba(0, 162, 219, 0.15)' },
        { y: 49, color: 'rgba(55, 100, 252, 0.15)' },
        { y: 56, color: 'rgba(114, 22, 228, 0.15)' },
        { y: 50, color: 'rgba(0, 219, 196, 0.15)' }
      ]
    },
    {
      name: 'B',
      // stack: 'sj',
      data: [
        {
          y: 27,
          color: {
            linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
            stops: [
              [0, 'rgba(53, 208, 233, 1)'],
              [1, 'rgba(0, 162, 219, 1)']
            ]
          }
        },
        {
          y: 15,
          color: {
            linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
            stops: [
              [0, 'rgba(11, 63, 252, 1)'],
              [1, 'rgba(55, 100, 252, 1)']
            ]
          }
        },
        {
          y: 8,
          color: {
            linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
            stops: [
              [0, 'rgba(182, 80, 249, 1)'],
              [1, 'rgba(114, 22, 228, 1)']
            ]
          }
        },
        {
          y: 14,
          color: {
            linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
            stops: [
              [0, 'rgba(29, 209, 130, 1)'],
              [1, 'rgba(0, 219, 196, 1)']
            ]
          }
        }
      ]
    }
  ]
};

const Bar3D = () => {
  useEffect(() => {
    highcharts.chart(document.getElementById('bar3D'), TransCyConfig);
  }, []);
  return <div className="module" id="bar3D" />;
};
export default Bar3D;
