import { Button, Collapse, Divider, Space } from 'antd';
import shortUuid from 'short-uuid';
import { Configs, GroupConfigs } from 'form-studio';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Group } from '../builder-components';
import { mockBackend } from '../mock-backend';

export const BuilderPage: FC = () => {
  const history = useHistory();
  const [configs, setConfigs] = useState<Configs>([]);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [choiceIds, setChoiceIds] = useState<string[]>([]);

  useEffect(() => {
    const configs = mockBackend.getConfigs();
    setConfigs(configs);
  }, []);

  useEffect(() => {
    const groupIds: string[] = [];
    const questionIds: string[] = [];
    const choiceIds: string[] = [];

    configs.forEach(group => {
      if (group.id) {
        groupIds.push(group.id);
      }

      group.questions?.forEach(question => {
        if (question.id) {
          questionIds.push(question.id);
        }

        question.choices?.forEach(choice => {
          if (choice.id) {
            choiceIds.push(choice.id);
          }
        });
      });
    });

    setGroupIds(groupIds);
    setQuestionIds(questionIds);
    setChoiceIds(choiceIds);
  }, [configs]);

  const saveConfigs = () => {
    // Validate
    // if (!form.validate()) {
    //   alert('There are some invalid answers, please fix them before saving.');
    //   return;
    // }

    mockBackend.saveConfigs(configs);
    alert('Configs have been saved.');
  };

  const addGroup = () => {
    setConfigs([...configs, {
      id: shortUuid.generate(),
      defaultDisabled: false,
      ui: { title: '' },
      questions: []
    }]);
  };

  const updateGroup = (groupId: string, group: GroupConfigs) => {
    const newConfigs = configs.map(g => g.id !== groupId ? g : group);
    setConfigs(newConfigs);
  };

  const removeGroup = (groupId: string) => {
    const newConfigs = configs.filter(g => g.id !== groupId);
    setConfigs(newConfigs);
  };

  return (
    <>
      <Button style={{ marginTop: 16, marginLeft: 16 }} type="link" onClick={() => history.push('/')}>&lt; Back</Button>

      <Space direction="vertical" style={{ width: '100%', padding: 32 }}>
        <Collapse>
          {configs.map(group =>
            <Collapse.Panel key={group.id!} header={group.ui!.title || 'Untitled'}>
              <Group
                group={group}
                updateGroup={updateGroup}
                removeGroup={removeGroup}
                groupIds={groupIds}
                questionIds={questionIds}
                choiceIds={choiceIds}
              />
            </Collapse.Panel>
          )}
        </Collapse>

        <Button type="primary" ghost onClick={addGroup}>+ Add Group</Button>

        <Button type="primary" onClick={saveConfigs}>Save</Button>

        <Divider />

        <pre style={{ fontSize: 12 }}>{JSON.stringify(configs, null, 2)}</pre>
      </Space>
    </>
  );
};
