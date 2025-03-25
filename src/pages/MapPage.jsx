import React, { useState } from 'react';
import { Card, Select } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import './MapPage.css';

const { Option } = Select;

export default function MapPage() {
  const [mapMode, setMapMode] = useState('3d');

  return (
    <div className="map-container">
      <Card
        title={
          <div className="map-header">
            <EnvironmentOutlined style={{ marginRight: 8 }} />
            <span>会场三维地图</span>
            <Select
              defaultValue="3d"
              style={{ width: 100, marginLeft: 'auto' }}
              onChange={(value) => setMapMode(value)}
            >
              <Option value="3d">3D模式</Option>
              <Option value="2d">2D模式</Option>
            </Select>
          </div>
        }
        bordered={false}
      >
        <div className={`map-content ${mapMode}`}>
          <img 
            src={mapMode === '3d' 
              ? "https://via.placeholder.com/800x500.png?text=3D会场地图" 
              : "https://via.placeholder.com/800x500.png?text=2D平面地图"}
            alt="会场地图"
          />
          <div className="map-overlay">
            <h3>主会场区域</h3>
            <p>1F 论坛主展厅</p>
            <p>2F 分论坛会议室</p>
            <p>B1 设备展示区</p>
          </div>
        </div>
      </Card>
    </div>
  );
} 