import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
export default function bar() {
  const myEcharts = useRef(null);
  useEffect(() => {
    initEcharts();
    return () => {
      window.removeEventListener('resize', screenAdapter);
    };
  }, []);

  const initEcharts = () => {
    myEcharts.current = echarts.init(document.getElementById('bar'));
    myEcharts.current.setOption({
      title: {
        text: '柱状图',
        textStyle: {
          color: 'green',
          fontSize: 16
        },
        left: 'center'
      },
      tooltip: {
        // show: false
        backgroundColor: '#333',
        borderColor: '#333',
        formatter: data => {
          console.log(data);
          return `${data.name}的${data.seriesName}是${data.data}<br/>哈哈哈`;
        }
      },
      backgroundColor: 'rgba(128, 128, 128, 0.1)',
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {
        name: 'y轴',
        nameRotate: '90',
        nameLocation: 'center',
        nameTextStyle: {
          color: 'red',
          fontSize: 16,
          padding: [0, 0, 15, 20]
        }
      },
      series: [
        {
          name: '销量',
          type: 'bar',
          barWidth: 30,
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            normal: {
              barBorderRadius: [15, 15, 0, 0],
              color: function (params) {
                return ['red', 'orange', 'yellow', 'green', 'blue', 'purple'][params.dataIndex];
              }
            }
          }
        }
      ]
    });
    window.addEventListener('resize', screenAdapter);
  };

  const screenAdapter = () => {
    const bar = document.getElementById('bar');
    const fontSize = (bar.offsetWidth / 100) * 3.6;
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

  return <div className="module" id="bar"></div>;
}
