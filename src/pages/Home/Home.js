import React, { useState } from 'react';
import { Layout, Grid, Card, Tag, Menu, Dropdown } from 'antd';
import { RadarChartOutlined, SafetyOutlined, AudioOutlined } from '@ant-design/icons';
import './Home.css';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const QuickAccess = ({ onMenuSelect }) => {
  const screens = useBreakpoint();
  return (
    <Card title="核心功能入口" style={{ marginTop: 24 }}>
      <Grid gutter={[16, 16]}>
        <Grid.Item xs={24} md={8}>
          <Card hoverable onClick={() => onMenuSelect('navigation')}>
            <RadarChartOutlined style={{ fontSize: 24 }} />
            <h3>智能路径导航</h3>
            <Tag color="blue" className="security-level-tag">Lv.3+</Tag>
          </Card>
        </Grid.Item>
        <Grid.Item xs={24} md={8}>
          <Card hoverable onClick={() => onMenuSelect('security')}>
            <SafetyOutlined style={{ fontSize: 24 }} />
            <h3>安全态势感知</h3>
            <Tag color="green" className="security-level-tag">实时</Tag>
          </Card>
        </Grid.Item>
        <Grid.Item xs={24} md={8}>
          <Card hoverable onClick={() => onMenuSelect('audio')}>
            <AudioOutlined style={{ fontSize: 24 }} />
            <h3>语音指令系统</h3>
            <Tag color="orange" className="security-level-tag">Beta</Tag>
          </Card>
        </Grid.Item>
      </Grid>
    </Card>
  );
};

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const headerMenu = (
    <Menu onClick={({ key }) => setSelectedMenu(key)}>
      <Menu.Item key="alerts">安全告警</Menu.Item>
      <Menu.Item key="devices">接入设备</Menu.Item>
      <Menu.SubMenu title="更多功能">
        <Menu.Item key="settings">系统设置</Menu.Item>
        <Menu.Item key="logs">审计日志</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <Layout className="home-layout">
      <Header className="header">
        <div className="logo">
          <img src="/logo.png" alt="安全大会logo" width={40} />
          <span style={{ marginLeft: 12 }}>西湖论剑安全中枢</span>
        </div>
        <Dropdown overlay={headerMenu}>
        <Button type="primary" onClick={showModal} style={{ marginLeft: 8 }}>
          AI助手
        </Button>
          <span style={{ cursor: 'pointer' }}>功能菜单 ▼</span>
        </Dropdown>
      </Header>
      <Content className="content">
        <QuickAccess onMenuSelect={setSelectedMenu} />
        <Modal
          title="AI助手"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          <div style={{ display: 'flex', height: 500 }}>
            <Menu
              mode="inline"
              style={{ width: 200, borderRight: '1px solid #f0f0f0' }}
              onClick={({ key }) => setSelectedMenu(key)}
            >
              <Menu.Item key="navigation">智能路径导航</Menu.Item>
              <Menu.Item key="security">安全态势感知</Menu.Item>
              <Menu.Item key="audio">语音指令系统</Menu.Item>
              <Menu.Item key="alerts">安全告警</Menu.Item>
              <Menu.Item key="devices">接入设备</Menu.Item>
              <Menu.SubMenu title="更多功能">
                <Menu.Item key="settings">系统设置</Menu.Item>
                <Menu.Item key="logs">审计日志</Menu.Item>
              </Menu.SubMenu>
            </Menu>
            <div style={{ flex: 1, padding: '0 16px' }}>
              <h3>AI助手</h3>
              <p>请选择左侧菜单或直接与我对话</p>
            </div>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Home;