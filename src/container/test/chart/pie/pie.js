import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function pie() {
  const myEcharts = useRef(null);
  useEffect(() => {
    initEcharts();
    return () => {
      window.removeEventListener('resize', screenAdapter);
    };
  }, []);

  const initEcharts = () => {
    myEcharts.current = echarts.init(document.getElementById('pie'));
    myEcharts.current.setOption({
      title: {
        text: '某站点用户访问来源',
        subtext: '嘻嘻嘻嘻',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        itemWidth: 25,
        itemHeight: 15,
        textStyle: {
          fontSize: 14
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '60%',
          center: ['50%', '60%'],
          label: {
            show: false
          },
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
    window.addEventListener('resize', screenAdapter);
  };

  const screenAdapter = () => {
    const pie = document.getElementById('pie');
    const fontSize = (pie.offsetWidth / 100) * 3.6;
    const adapterOption = {
      title: {
        textStyle: {
          fontSize: fontSize
        }
      },
      legend: {
        textStyle: fontSize * 0.8,
        itemWidth: fontSize,
        itemHeight: fontSize * 0.6
      }
    };
    myEcharts.current.setOption(adapterOption);
    myEcharts.current.resize();
  };
  return <div className="module" id="pie"></div>;
}
