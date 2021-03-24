'use strict';
/**
 * Created by fanweihua on 2020/10/09.
 * 复原
 */
import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import './reload.less';
import { getMapViewByMapId } from '@/common/tool/mapUtils';
import { changeTwoArray } from '@/common/tool/units'; // 工具类
const Reload = props => {
  const { userInfo } = useSelector(state => state.userModel);
  const { mapId } = props;
  const mapIn = getMapViewByMapId(mapId); // 根据不同的地图id获取对应的地图实例
  /**
   * 事件复原
   */
  const onReloadEvent = () => {
    if (userInfo?.userInfo?.orgCode) {
      const { orgCode } = userInfo.userInfo;
      mapIn.getAreaCoord(orgCode).then(result => {
        if (result?.rows?.length) {
          let coordinates = result.rows[0];
          coordinates = changeTwoArray(coordinates.bounds);
          const geoJson = {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [coordinates] },
            properties: { drawType: 'freehandPolygon', zIndex: 1 }
          };
          mapIn.locateByGraphicGeoJson(geoJson); // 根据图形定位
        }
      });
    }
  };
  return (
    <div className="aside_toolBar_reload">
      <Tooltip placement="left" title="复原">
        <a className="tool_button" onClick={() => onReloadEvent()}>
          <ReloadOutlined />
        </a>
      </Tooltip>
    </div>
  );
};
export default Reload;
