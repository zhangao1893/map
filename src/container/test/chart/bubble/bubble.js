import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './bubble.less';
const data = [
  { name: '一', value: 10 },
  { name: '二', value: 22 },
  { name: '三', value: 33 },
  { name: '四', value: 41 },
  { name: '五', value: 150 },
  { name: '六', value: 62 },
  { name: '七', value: 7 },
  { name: '八', value: 8 },
  { name: '九', value: 9 }
];
const infoMap = {
  1: 'radial-gradient(rgba(0, 255, 168, 0), rgba(0, 255, 168, 0), rgba(0, 255, 168, 0.5), rgba(0, 255, 168, 1))',
  2: 'radial-gradient(rgba(32, 137, 224, 0), rgba(32, 137, 224, 0), rgba(32, 137, 224, 0.5), rgba(32, 137, 224, 1))',
  3: 'radial-gradient(rgba(142, 77, 141, 0), rgba(142, 77, 141, 0), rgba(142, 77, 141, 0.5), rgba(142, 77, 141, 1))'
};

const InferenceStatistics = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const list = getRandomInfo(data);
    setDataSource(list);
  }, []);

  /**
   * 根据数据集合计算位置和大小
   */
  const getRandomInfo = arr => {
    const info = [];
    const total = _.sumBy(arr, o => +o.value);
    const wM = arr.length < 7 ? 0.5 : 0.5 / (arr.length + 2);
    const wH = arr.length < 7 ? 0.8 : 0.8 / (arr.length + 2);
    _.each(arr, ({ value, name }, index) => {
      let diameter = (value * 5) / total + 4.5;
      let valueFont = (value * 6) / total;
      let labelFont = (value * 5) / total;
      if (diameter < 4.5) {
        diameter = 4.5;
      }
      if (valueFont < 1.4) {
        valueFont = 1.4;
      }
      if (labelFont < 1.2) {
        labelFont = 1.2;
      }
      info[index] = {
        name,
        value,
        diameter: `${diameter}vh`,
        valueFont: `${valueFont}vh`,
        labelFont: `${labelFont}vh`,
        margin: `${Math.random() + wH}vh ${Math.random() + wM}vh`,
        animationDelay: `${Math.random()}s`,
        animation: `jump ${Math.random() + 6}s linear infinite`
      };
    });
    return info;
  };

  return (
    <div className="module">
      <div style={{ textAlign: 'center', fontSize: '2vh' }}>bubble Manual</div>
      <div className="bubble">
        {dataSource.map((item, index) => {
          const { diameter, margin, animation, animationDelay, labelFont, name, value } = item;
          return (
            <div
              key={index}
              className="item"
              style={{
                width: diameter,
                height: diameter,
                backgroundImage: infoMap[Math.ceil(Math.random() * 3)],
                margin,
                animation,
                animationDelay
              }}>
              <span
                className="value"
                style={{
                  fontSize: labelFont
                }}>
                {name}
              </span>
              <span
                className="label"
                style={{
                  fontSize: labelFont
                }}>
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default InferenceStatistics;
