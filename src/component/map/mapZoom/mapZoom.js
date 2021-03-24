'use strict';
/**
 * Created by fanweihua on 2020/11/06.
 * 地图级别
 */
import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { getMapViewByMapId } from '@/common/tool/mapUtils';
import './mapZoom.less';
let mapEventUuid;
const MapZoom = props => {
  const { mapId } = props;
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const mapIn = getMapViewByMapId(mapId); // 根据不同的地图id获取对应的地图实例
    const { uuid } = mapIn.registerMapEvent('mapChange', result => {
      if (uuid === result.eventUUID) {
        const zoom = result.zoom.toFixed(2);
        setZoom(parseFloat(zoom));
      }
    });
    mapEventUuid = uuid;
    return () => {
      mapIn.unregisterMapEvent(mapEventUuid);
      mapEventUuid = undefined;
    };
  }, []);
  return (
    <div className="aside_toolBar_mapZoom">
      <Tooltip placement="left" title="地图级别">
        <span>{zoom}</span>
      </Tooltip>
    </div>
  );
};
export default MapZoom;
