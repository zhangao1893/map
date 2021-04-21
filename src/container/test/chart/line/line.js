import React, { useEffect } from 'react';
import * as echarts from 'echarts';
export default function line() {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('line'));
    myChart.setOption({
      title: {
        text: '折线'
      },
      legend: {
        data: ['销量一', '销量二']
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        name: 'x轴',
        nameLocation: 'center',

        nameTextStyle: {
          color: 'green',
          fontSize: 16,
          padding: [10, 0, 0, 0]
        }
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        backgroundColor: '#333',
        borderColor: '#333',
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          },
          crossStyle: {
            color: 'red'
          },
          lineStyle: {
            color: '#000'
          }
        }
      },
      series: [
        {
          name: '销量一',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
          smooth: true,
          itemStyle: {
            color: 'green'
          }
        },
        {
          name: '销量二',
          data: [15, 330, 124, 318, 135, 47, 360],
          type: 'line',
          smooth: true,
          itemStyle: {
            color: 'red'
          }
        }
      ]
    });
  }, []);
  return (
    <div className="module" id="line">
      line
    </div>
  );
}
