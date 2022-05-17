import { Button, Space } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: FC = () => {
  const navigate = useNavigate();

  return (
    <Space style={{ padding: 32 }}>
      <Button type="primary" onClick={() => navigate('/form')}>Form</Button>
      <Button type="primary" onClick={() => navigate('/builder')}>Form Builder</Button>
    </Space>
  );
};
