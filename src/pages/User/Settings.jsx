import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, Avatar, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './User.css';

export default function UserSettings() {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');

  const onFinish = (values) => {
    console.log('提交设置:', values);
    message.success('设置已保存');
    localStorage.setItem('username', values.username);
    localStorage.setItem('email', values.email);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件');
    }
    return isImage;
  };

  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      localStorage.setItem('avatar', e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="settings-container">
      <Card title="用户设置" className="settings-card">
        <div className="avatar-section">
          <Avatar 
            size={120} 
            src={avatar} 
            icon={<UserOutlined />}
            className="user-avatar"
          />
          <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={handleUpload}
          >
            <Button type="link">更换头像</Button>
          </Upload>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            username: localStorage.getItem('username') || '用户',
            email: localStorage.getItem('email') || ''
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="绑定邮箱"
            name="email"
            rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="password"
            rules={[{ min: 6, message: '密码至少6位' }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
} 