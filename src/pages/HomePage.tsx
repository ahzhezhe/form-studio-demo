import React, { FC } from 'react';
import { Button, Space } from 'antd';
import { useHistory } from 'react-router-dom';

export const HomePage: FC = () => {
  const history = useHistory();

  return (
    <Space style={{ padding: 32 }}>
      <Button type="primary" onClick={() => history.push('./form')}>Form</Button>
      <Button type="primary" onClick={() => history.push('./builder')}>Form Builder</Button>
    </Space>
  );
};
