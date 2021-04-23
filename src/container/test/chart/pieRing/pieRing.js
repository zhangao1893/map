import React, { useEffect } from 'react';
import highcharts from 'highcharts/highstock';
import highCharts3D from 'highcharts/highcharts-3d';
highCharts3D(highcharts);
const PieDimConfig = {
  chart: { type: 'pie', options3d: { enabled: true, alpha: 66 }, backgroundColor: '#fff', spacingBottom: 30 },
  tooltip: {
    style: { fontSize: 14.19 },
    headerFormat: '<span style="font-size: 14.19px">{series.name}</span><br/>{point.key}：',
    pointFormat: ' <b>{point.y}人</b>'
  },
  legend: {
    enabeld: true,
    align: 'left',
    layout: 'vertical',
    verticalAlign: 'middle',
    itemMarginTop: 9.46,
    itemMarginBottom: 9.46,
    width: 100,
    itemStyle: { color: '#000', fontSize: 13.244 },
    itemHoverStyle: { color: 'red' }
  },
  title: { text: 'pieRing Highcharts' },
  credits: { enabled: false },
  plotOptions: {
    pie: {
      innerSize: 120,
      depth: 45,
      size: 200,
      center: ['40%', '50%'],
      showInLegend: true,
      dataLabels: {
        enabled: true,
        color: 'red',
        style: { fontSize: 13.244 },
        connectorColor: 'green',
        format: '{point.percentage:.1f}%',
        distance: 20,
        connectorPadding: 0
      },
      colors: [
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(1, 255, 144, 1)'],
            [1, 'rgba(1, 255, 228, 1)']
          ]
        },
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(25, 177, 255, 1)'],
            [1, 'rgba(47, 106, 255, 1)']
          ]
        },
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(200, 70, 146, 1)'],
            [1, 'rgba(88, 56, 140, 1)']
          ]
        },
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(238, 166, 66, 1)'],
            [1, 'rgba(224, 112, 66, 1)']
          ]
        },
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(205, 152, 153, 1)'],
            [1, 'rgba(159, 52, 52, 1)']
          ]
        }
      ]
    }
  },
  series: [
    {
      name: '警种结构',
      data: [
        { name: '实战类', y: 845 },
        { name: '配侦类', y: 614 },
        { name: '综合类', y: 589 },
        { name: '其它', y: 300 }
      ]
    }
  ]
};

const pieRing = () => {
  useEffect(() => {
    highcharts.chart(document.getElementById('pieRing'), PieDimConfig);
  }, []);
  return <div className="module" id="pieRing" />;
};
export default pieRing;
