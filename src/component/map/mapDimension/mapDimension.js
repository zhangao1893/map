'use strict';
/**
 * Created by fanweihua on 2020/08/30.
 * 维度切换
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import './mapDimension.less';
import { getMapViewByMapId } from '@/common/tool/mapUtils';
const DimensionList = [{ type: '2D' }, { type: '3D' }];
let dimensionState = false; // 切换状态
const MapDimension = props => {
  const { mapId } = props;
  const dispatch = useDispatch();
  const mapIn = getMapViewByMapId(mapId); // 根据不同的地图id获取对应的地图实例
  const [curDimension, setDimension] = useState(DimensionList[0]); // 当前维度
  /**
   * 入口
   */
  useEffect(() => {
    if (mapIn) {
      const curMapOptions = mapIn.getCurMapOptions();
      setDimension({ type: curMapOptions.modelView });
      setCurrentMapOptions(); // 设置当前地图配置
    }
  }, []);
  /**
   * 维度切换
   */
  const onChangeView = () => {
    if (dimensionState) {
      return;
    }
    const item = curDimension.type === '2D' ? DimensionList[1] : DimensionList[0];
    setDimension({ ...item });
    dimensionState = true;
    mapIn.mapDimension(item.type, () => {
      dimensionState = false;
    }); // 地图维度切换
    setCurrentMapOptions(); // 设置当前地图配置
  };
  /**
   * 设置当前地图配置
   */
  const setCurrentMapOptions = () => {
    const mapOption = mapIn.getCurMapOptions(); // 获取当前地图配置信息
    dispatch({
      type: 'mapModel/getMapOptions',
      payload: { mapOption }
    });
  };
  return (
    <div className="aside_toolBar_list">
      <Tooltip placement="left" title="维度切换">
        <a className="tool_button" onClick={() => onChangeView()}>
          <span>{curDimension.type}</span>
        </a>
      </Tooltip>
    </div>
  );
};
export default MapDimension;
