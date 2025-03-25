import React, { useState } from 'react';
import { Card, Form, Input, Button, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (values.username === 'admin' && values.password === 'WestLake@2024') {
        navigate('/admin');
        localStorage.setItem('isAdmin', 'true');
      } else {
        setError('用户名或密码错误');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card title="管理员登录" className="login-card">
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
} 