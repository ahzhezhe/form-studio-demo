import { Button, Collapse, Divider, Space } from 'antd';
import { Form, ChoiceConfigs, Configs, GroupConfigs, QuestionConfigs, QuestionType } from 'form-studio';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shortUuid from 'short-uuid';
import { Group } from '../builder-components';
import { mockBackend } from '../mock-backend';

export interface GroupBuilder {
  uuid: string;
  id?: string;
  defaultDisabled: boolean;
  enabledOnSelected?: string[];
  disabledOnSelected?: string[];
  title: string;
  questions: QuestionBuilder[];
}

export interface QuestionBuilder {
  uuid: string;
  id?: string;
  defaultDisabled: boolean;
  enabledOnSelected?: string[];
  disabledOnSelected?: string[];
  type: QuestionType;
  inputType?: string;
  title: string;
  placeholder?: string;
  choices: ChoiceBuilder[];
  validators: string[];
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface ChoiceBuilder {
  uuid: string;
  id?: string;
  defaultDisabled: boolean;
  enabledOnSelected?: string[];
  disabledOnSelected?: string[];
  value: string;
  title: string;
}

export const BuilderPage: FC = () => {
  const navigate = useNavigate();
  const [configs, setConfigs] = useState<Configs>();
  const [groups, setGroups] = useState<GroupBuilder[]>([]);
  const [choiceIds, setChoiceIds] = useState<string[]>([]);
  const [showConfigs, setShowConfigs] = useState(false);

  useEffect(() => {
    const configs = mockBackend.getConfigs();

    const groups: GroupBuilder[] = configs.groups!.map((group): GroupBuilder => ({
      uuid: shortUuid.generate(),
      id: group.id,
      defaultDisabled: !!group.defaultDisabled,
      enabledOnSelected: group.enabledOnSelected?.[0] as string[],
      disabledOnSelected: group.disabledOnSelected?.[0] as string[],
      title: group.custom?.title,
      questions: (group.questions || []).map((question): QuestionBuilder => ({
        uuid: shortUuid.generate(),
        id: question.id,
        defaultDisabled: !!question.defaultDisabled,
        enabledOnSelected: question.enabledOnSelected?.[0] as string[],
        disabledOnSelected: question.disabledOnSelected?.[0] as string[],
        type: question.type,
        inputType: question.custom?.inputType,
        title: question.custom?.title,
        placeholder: question.custom?.placeholder,
        validators: question.validators || [],
        maxLength: question.custom?.maxLength,
        min: question.custom?.min,
        max: question.custom?.max,
        choices: (question.choices || []).map((choice): ChoiceBuilder => ({
          uuid: shortUuid.generate(),
          id: choice.id,
          defaultDisabled: !!choice.defaultDisabled,
          enabledOnSelected: choice.enabledOnSelected?.[0] as string[],
          disabledOnSelected: choice.disabledOnSelected?.[0] as string[],
          value: choice.value,
          title: choice.custom?.title
        }))
      }))
    }));

    setGroups(groups);
  }, []);

  useEffect(() => {
    const groupIds: string[] = [];
    const questionIds: string[] = [];
    const choiceIds: string[] = [];

    groups.forEach(group => {
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

    setChoiceIds(choiceIds);

    const configs: Configs = {
      groups: groups.map((group): GroupConfigs => ({
        id: group.id,
        defaultDisabled: group.defaultDisabled,
        custom: {
          title: group.title
        },
        questions: group.questions.map((question): QuestionConfigs => ({
          id: question.id,
          defaultDisabled: question.defaultDisabled,
          type: question.type,
          custom: {
            inputType: question.inputType,
            title: question.title,
            placeholder: question.placeholder,
            maxLength: question.maxLength,
            min: question.min,
            max: question.max
          },
          disabledOnSelected: question.disabledOnSelected ? [question.disabledOnSelected] : undefined,
          enabledOnSelected: question.enabledOnSelected ? [question.enabledOnSelected] : undefined,
          validators: question.validators,
          choices: question.choices.map((choice): ChoiceConfigs => ({
            id: choice.id,
            defaultDisabled: choice.defaultDisabled,
            value: choice.value,
            custom: {
              title: choice.title
            }
          }))
        }))
      }))
    };

    setConfigs(configs);
  }, [groups]);

  const saveConfigs = () => {
    const result = Form.validateConfigs(configs!);
    if (!result.valid) {
      let errorMsg = '';
      Object.entries(result.errors!).forEach(([key, errors]) => {
        errorMsg += `\n${key} - ${errors.join(', ')}`;
      });
      alert(`There are some invalid configs, please fix them before saving.${errorMsg}`);
      return;
    }

    // TODO: need to do more custom validation, e.g. title cannot be empty, etc.

    mockBackend.saveConfigs(configs!);
    alert('Configs have been saved.');
  };

  const addGroup = () => {
    setGroups([...groups, {
      uuid: shortUuid.generate(),
      defaultDisabled: false,
      title: '',
      questions: []
    }]);
  };

  const updateGroup = (uuid: string, group: GroupBuilder) => {
    const newGroups = groups.map(g => g.uuid !== uuid ? g : group);
    setGroups(newGroups);
  };

  const removeGroup = (uuid: string) => {
    const newGroups = groups.filter(g => g.uuid !== uuid);
    setGroups(newGroups);
  };

  return (
    <>
      <Button style={{ marginTop: 16, marginLeft: 16 }} type="link" onClick={() => navigate('/')}>&lt; Back</Button>

      <Space direction="vertical" style={{ width: 'calc(100% - 64px)', padding: 32 }}>
        <Collapse>
          {groups.map(group => (
            <Collapse.Panel key={group.uuid}
              header={(
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <div>{group.title || 'Untitled'}</div>
                  <div style={{ color: 'red', cursor: 'pointer' }} onClick={e => {
                    removeGroup(group.uuid);
                    e.stopPropagation();
                  }}>Remove</div>
                </div>
              )}>
              <Group
                group={group}
                updateGroup={updateGroup}
                choiceIds={choiceIds}
              />
            </Collapse.Panel>
          )
          )}
        </Collapse>

        <Button type="primary" onClick={addGroup}>+ Add Group</Button>

        <Button style={{ marginTop: 16 }} type="primary" size="large" onClick={saveConfigs}>Save</Button>

        <Divider />

        <Button type="link" onClick={() => setShowConfigs(!showConfigs)}>{showConfigs ? 'Hide Configs' : 'Show Configs'}</Button>
        {showConfigs && <pre style={{ fontSize: 12 }}>{JSON.stringify(configs, null, 2)}</pre>}
      </Space>
    </>
  );
};
