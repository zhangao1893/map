import React, { useEffect } from 'react';
import highcharts from 'highcharts/highstock';
import highCharts3D from 'highcharts/highcharts-3d';
// import cylinder from 'highcharts/modules/cylinder';
// import funnel3d from 'highcharts/modules/funnel3d';
highCharts3D(highcharts);
// cylinder(highcharts);
// funnel3d(highcharts);
const PieDimConfig = {
  chart: {
    type: 'pie',
    options3d: { enabled: true, alpha: 60 },
    backgroundColor: '#fff',
    spacingBottom: 5
  },
  tooltip: {
    style: { fontSize: 14.19 },
    headerFormat: '<span style="font-size: 14.19px">{series.name}</span><br/>{point.key}：',
    pointFormat: ' <b>{point.y}人</b>'
  },
  credits: { enabled: false },
  legend: {
    enabeld: true,
    align: 'right',
    layout: 'vertical',
    verticalAlign: 'middle',
    itemMarginTop: 6.622,
    itemMarginBottom: 6.622,
    // maxHeight: '100%',
    // y: 0,
    width: 115,
    itemStyle: { color: '#000', fontSize: 13.244 },
    itemHoverStyle: { color: 'red' }
  },
  title: { text: 'pie3D Highcharts' },
  plotOptions: {
    pie: {
      depth: 50,
      size: 200,
      showInLegend: true,
      dataLabels: {
        enabled: true,
        color: 'green',
        style: { fontSize: 13.244 },
        connectorColor: 'red',
        format: '{point.percentage:.1f}%',
        distance: 20,
        connectorPadding: 0
      },
      colors: [
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(196, 112, 255, 1)'],
            [1, 'rgba(189, 43, 228, 1)']
          ]
        },
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(26, 148, 254, 1)'],
            [1, 'rgba(40, 50, 242, 1)']
          ]
        },
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(9, 197, 162, 1)'],
            [1, 'rgba(7, 166, 131, 1)']
          ]
        },
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(242, 222, 117, 1)'],
            [1, 'rgba(232, 181, 49, 1)']
          ]
        },
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(226, 254, 162, 1)'],
            [1, 'rgba(224, 237, 91, 1)']
          ]
        },
        {
          linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
          stops: [
            [0, 'rgba(159, 52, 52, 1)'],
            [1, 'rgba(205, 152, 153, 1)']
          ]
        }
      ]
    }
  },
  series: [
    {
      name: '人员结构',
      data: [
        { name: '人民警察', y: 750 },
        { name: '警务辅助', y: 650 },
        { name: '机关工勤', y: 514 },
        { name: '公务员', y: 666 },
        { name: '事业单位', y: 845 },
        { name: '其他人员', y: 400 }
      ]
    }
  ]
};

const Pie3D = props => {
  const { data = [] } = props;
  useEffect(() => {
    highcharts.chart(document.getElementById('pie3D'), PieDimConfig);
  }, [data]);
  return <div className="module" id="pie3D" />;
};
export default Pie3D;
