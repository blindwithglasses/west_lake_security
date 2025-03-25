import React, { useState } from 'react';
import { Card, Form, Input, Button, Alert, Divider } from 'antd';
import { LockOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './User.css';

export default function UserLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 模拟登录请求
      if (values.username === 'user' && values.password === 'User@2024') {
        navigate('/');
        localStorage.setItem('isUser', 'true');
      } else {
        setError('用户名或密码错误');
      }
    } catch {
      setError('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card title="用户登录" className="login-card">
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入手机号/邮箱' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="手机号/邮箱" />
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
        <Divider>其他登录方式</Divider>
        <div className="social-login">
          <Button icon={<WechatOutlined />} block style={{ marginBottom: 8 }}>
            微信登录
          </Button>
        </div>
      </Card>
    </div>
  );
} 