import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Card, Row, Col, Table, Tabs, Form, Input, Button, DatePicker, Select, Timeline } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SafetyOutlined,
  AuditOutlined,
  SearchOutlined
} from '@ant-design/icons';
import './Admin.css';

const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const dataSource = [
  { key: '1', name: '张三', role: '管理员', lastLogin: '2024-05-20 14:30' },
  { key: '2', name: '李四', role: '审核员', lastLogin: '2024-05-20 09:15' },
];

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '角色', dataIndex: 'role', key: 'role' },
  { title: '最后登录', dataIndex: 'lastLogin', key: 'lastLogin' },
];

// 用户管理扩展
const UserManagement = () => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dataSource);
  
  const roles = [
    { id: 1, name: '超级管理员' },
    { id: 2, name: '系统管理员' },
    { id: 3, name: '安全审计员' },
    { id: 4, name: '普通用户' }
  ];

  const handleSearch = async (values) => {
    setLoading(true);
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 过滤逻辑
    const filtered = dataSource.filter(item => {
      const matchUsername = values.username 
        ? item.name.includes(values.username)
        : true;
      const matchRole = values.role 
        ? item.role === roles.find(r => r.id === values.role)?.name
        : true;
      return matchUsername && matchRole;
    });

    setData(filtered);
    setLoading(false);
  };

  const handleReset = () => {
    form.resetFields();
    setData(dataSource);
  };

  return (
    <Card>
      <Form form={form} layout="inline" onFinish={handleSearch}>
        <Form.Item name="username" label="用户名">
          <Input placeholder="输入用户名" />
        </Form.Item>
        <Form.Item name="role" label="角色">
          <Select style={{ width: 120 }}>
            {roles.map(role => (
              <Option key={role.id} value={role.id}>{role.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleReset} style={{ marginRight: 8 }}>
            重置
          </Button>
          <Button 
            type="primary" 
            icon={<SearchOutlined />} 
            htmlType="submit"
            loading={loading}
          >
            搜索
          </Button>
        </Form.Item>
      </Form>

      <Table
        dataSource={data}
        loading={loading}
        columns={[
          ...columns,
          {
            title: '操作',
            key: 'action',
            render: () => (
              <div>
                <Button type="link">编辑</Button>
                <Button type="link" danger>删除</Button>
              </div>
            )
          }
        ]}
        style={{ marginTop: 16 }}
      />
    </Card>
  );
};

// 审计日志扩展
const AuditLogs = () => {
  const logs = [
    { time: '2024-05-20 14:30', action: '用户登录', operator: '张三' },
    { time: '2024-05-20 10:15', action: '修改权限设置', operator: '李四' },
    { time: '2024-05-20 09:00', action: '导出数据', operator: '王五' }
  ];

  return (
    <Card>
      <div style={{ marginBottom: 16 }}>
        <RangePicker showTime />
        <Button type="primary" icon={<SearchOutlined />} style={{ marginLeft: 8 }}>
          查询
        </Button>
      </div>
      
      <Timeline>
        {logs.map((log, index) => (
          <Timeline.Item key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h4>{log.action}</h4>
                <p>操作人: {log.operator}</p>
              </div>
              <span style={{ color: '#999' }}>{log.time}</span>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

export default function AdminDashboard() {
  const [activeKey, setActiveKey] = useState('1');

  // 新增菜单点击处理
  const handleMenuClick = (e) => {
    setActiveKey(e.key);
  };

  return (
    <Layout className="admin-layout">
      <Sider width={200} theme="light">
        <div className="admin-logo">
          <SafetyOutlined /> 管理后台
        </div>
        <Menu 
          mode="inline" 
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick} // 添加点击事件
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            仪表盘
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key="3" icon={<AuditOutlined />}>
            审计日志
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="admin-header">
          <Breadcrumb>
            <Breadcrumb.Item>管理后台</Breadcrumb.Item>
            <Breadcrumb.Item>
              {activeKey === '1' ? '仪表盘' : 
               activeKey === '2' ? '用户管理' : '审计日志'}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content className="admin-content">
          <Tabs activeKey={activeKey} onChange={setActiveKey}>
            <TabPane tab="仪表盘" key="1">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Card title="系统状态">
                    <p>在线用户: 12</p>
                    <p>安全等级: Lv.5</p>
                    <p>服务状态: 正常</p>
                  </Card>
                </Col>
                <Col span={16}>
                  <Card title="实时数据">
                    <div style={{ height: 200 }}>图表占位区</div>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="用户管理" key="2">
              <UserManagement />
            </TabPane>
            <TabPane tab="审计日志" key="3">
              <AuditLogs />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
} 