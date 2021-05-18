import { Configs, GroupConfigs } from 'form-studio';
import React, { FC, useEffect, useState } from 'react';
import { mockBackend } from '../mock-backend';
import { Button, Collapse, Divider, Space } from 'antd';
import { Group } from '../builder-components';
import shortUuid from 'short-uuid';

export const BuilderPage: FC = () => {
  const [configs, setConfigs] = useState<Configs>([]);

  useEffect(() => {
    const configs = mockBackend.getConfigs();
    setConfigs(configs);
  }, []);

  const addGroup = () => {
    configs.push({
      id: shortUuid.generate(),
      defaultDisabled: false,
      ui: { title: 'Untitled' },
      questions: []
    });
    setConfigs(configs);
  };

  const saveConfigs = () => {
    // Validate
    // if (!form.validate()) {
    //   alert('There are some invalid answers, please fix them before saving.');
    //   return;
    // }

    mockBackend.saveConfigs(configs);
    alert('Configs have been saved.');
  };

  const updateGroup = (groupId: string, group: GroupConfigs) => {
    const newConfigs = configs.map(g => g.id !== groupId ? g : group);
    setConfigs(newConfigs);
  };

  const removeGroup = (groupId: string) => {
    const newConfigs = configs.filter(g => g.id !== groupId);
    setConfigs(newConfigs);
  };

  const renderGroup = (group: GroupConfigs) => (
    <Collapse.Panel key={group.id!} header={group.ui!.title || 'Unnamed Group'}>
      <Group group={group} updateGroup={updateGroup} removeGroup={removeGroup} />
    </Collapse.Panel>
  );

  return (
    <Space direction="vertical" style={{ width: '100%', padding: 32 }}>
      <Collapse>
        {configs.map(group => renderGroup(group))}
      </Collapse>

      <Button type="primary" ghost onClick={addGroup}>+ Add Group</Button>

      <Button type="primary" onClick={saveConfigs}>Save</Button>

      <Divider />

      <pre style={{ fontSize: 12 }}>{JSON.stringify(configs, null, 2)}</pre>
    </Space>
  );
};
