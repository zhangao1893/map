'use strict';
/**
 * Created by fanweihua on 2020/11/11.
 * 鼠标移动显示坐标组件
 */
import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { getMapViewByMapId } from '@/common/tool/mapUtils';
import './mouseMoveView.less';
let mapEventUuid;
const MouseMoveView = props => {
  const { mapId } = props;
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const mapIn = getMapViewByMapId(mapId); // 根据不同的地图id获取对应的地图实例
    const { uuid } = mapIn.registerMapEvent('mouseMove', result => {
      if (uuid === result.eventUUID) {
        setCoordinate({ x: result.x, y: result.y });
      }
    });
    mapEventUuid = uuid;
    return () => {
      mapIn.unregisterMapEvent(mapEventUuid);
      mapEventUuid = undefined;
    };
  }, []);
  return (
    <div className="mouse-move-view">
      {coordinate.x}
      <Divider type="vertical" /> {coordinate.y}
    </div>
  );
};
export default MouseMoveView;
