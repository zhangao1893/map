import React from 'react';
import Map from '@/component/map/map'; // 地图组件
const mapId = 'map';
const mapOption = { baseMap: true, dimension: true, mouseMove: true };
const Index = () => {
  return <Map mapId={mapId} mapOption={{ ...mapOption }} />;
};
export default Index;
