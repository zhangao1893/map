import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
export default function line() {
  const myEcharts = useRef(null);
  useEffect(() => {
    initEcharts();
    return () => {
      window.removeEventListener('resize', screenAdapter);
    };
  }, []);
  const initEcharts = () => {
    myEcharts.current = echarts.init(document.getElementById('line'));
    myEcharts.current.setOption({
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
        type: 'value',
        axisLine: { show: true }
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
    window.addEventListener('resize', screenAdapter);
  };

  const screenAdapter = () => {
    const line = document.getElementById('line');
    const fontSize = (line.offsetWidth / 100) * 3.6;
    const adapterOption = {
      title: {
        textStyle: {
          fontSize: fontSize
        }
      }
    };
    myEcharts.current.setOption(adapterOption);
    myEcharts.current.resize();
  };
  return <div className="module" id="line"></div>;
}
