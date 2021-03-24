/* eslint-disable no-unused-vars */
'use strict';
/**
 * Created by fanweihua on 2020/08/30.
 * 地图类型切换
 */
import React, { useState, useEffect } from 'react';
import { getMapViewByMapId } from '@/common/tool/mapUtils'; // 地图接口工具
import './baseMapTypeChange.less';
import { onImgError } from '@/common/tool/units';
import _ from 'lodash';
const BaseMapTypeChange = props => {
  const { mapId } = props;
  const mapIn = getMapViewByMapId(mapId);
  // 地图类型状态
  const [mapTypeStatus, setMapTypeStatus] = useState(false);
  // 地图类型集合
  const [mapBaseTypes, setMapBaseTypes] = useState([]);
  // 当前地图底图
  const [currentBaseMap, setCurrentBaseMap] = useState({});
  /**
   * 入口
   */
  useEffect(() => {
    // 获取地图底图集合
    getBaseMap();
  }, []);
  /**
   * 地图类型切换
   */
  const mapTypeChange = state => {
    setMapTypeStatus(state);
  };
  /**
   * 获取地图底图集合
   */
  const getBaseMap = () => {
    if (mapIn) {
      const baseMapList = mapIn.getBaseMap();
      setMapBaseTypes(baseMapList);
      setCurrentBaseMapType(baseMapList); // 设置当前地图底图
    }
  };
  /**
   * 设置当前地图底图
   */
  const setCurrentBaseMapType = (baseMapList = '') => {
    const { basemap } = mapIn.getCurMapOptions();
    if (baseMapList?.length) {
      const cur = baseMapList.filter(item => item.name === basemap)[0];
      setCurrentBaseMap(cur || baseMapList[0]);
    }
  };
  /**
   * 地图底图切换
   */
  const onToggleMapType = item => {
    if (item) {
      setCurrentBaseMap({ ...item });
      if (mapIn) {
        mapIn.baseMapChange(item?.name);
      }
    }
  };
  return (
    <div
      className="base_map_type_change"
      onMouseEnter={() => mapTypeChange(true)}
      onMouseLeave={() => mapTypeChange(false)}>
      <div className={`mapType_list ${mapTypeStatus ? 'expand' : ''}`}>
        {mapBaseTypes
          .filter(item => item.name !== currentBaseMap.name)
          .map((item, index) => {
            return (
              <div
                key={index}
                className="map_type"
                onClick={() => {
                  onToggleMapType(item);
                }}>
                <img src={item.imgurl} onError={e => onImgError(e)} />
                <p className="label">
                  <span>{item.label}</span>
                </p>
              </div>
            );
          })}
      </div>
      {_.isEmpty(currentBaseMap) ? (
        ''
      ) : (
        <div className="current_map">
          <img src={currentBaseMap.imgurl} onError={e => onImgError(e)} />
          <p className="label label_active">
            <span>{currentBaseMap.label}</span>
          </p>
        </div>
      )}
    </div>
  );
};
export default BaseMapTypeChange;
