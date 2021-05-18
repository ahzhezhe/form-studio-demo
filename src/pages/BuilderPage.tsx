import { Button, Collapse, Divider, Space } from 'antd';
import shortUuid from 'short-uuid';
import Form, { ChoiceConfigs, ChoiceOnSelected, Configs, GroupConfigs, QuestionConfigs, QuestionType } from 'form-studio';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Group } from '../builder-components';
import { mockBackend } from '../mock-backend';

export interface GroupBuilder {
  uuid: string;
  id?: string;
  defaultDisabled: boolean;
  title: string;
  questions: QuestionBuilder[];
}

export interface QuestionBuilder {
  uuid: string;
  id?: string;
  defaultDisabled: boolean;
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
  value: string;
  title: string;
  onSelected: ChoiceOnSelected;
}

export const BuilderPage: FC = () => {
  const history = useHistory();
  const [configs, setConfigs] = useState<Configs>([]);
  const [groups, setGroups] = useState<GroupBuilder[]>([]);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [choiceIds, setChoiceIds] = useState<string[]>([]);
  const [showConfigs, setShowConfigs] = useState(false);

  useEffect(() => {
    const configs = mockBackend.getConfigs();

    const groups: GroupBuilder[] = configs.map((group): GroupBuilder => ({
      uuid: shortUuid.generate(),
      id: group.id,
      defaultDisabled: !!group.defaultDisabled,
      title: group.ui?.title as string,
      questions: (group.questions || []).map((question): QuestionBuilder => ({
        uuid: shortUuid.generate(),
        id: question.id,
        defaultDisabled: !!question.defaultDisabled,
        type: question.type,
        inputType: question.ui?.inputType as string,
        title: question.ui?.title as string,
        placeholder: question.ui?.placeholder as string,
        validators: question.validators || [],
        maxLength: question.ui?.maxLength as number,
        min: question.validation?.min as number,
        max: question.validation?.max as number,
        choices: (question.choices || []).map((choice): ChoiceBuilder => ({
          uuid: shortUuid.generate(),
          id: choice.id,
          defaultDisabled: !!choice.defaultDisabled,
          value: choice.value as string,
          title: choice.ui?.title as string,
          onSelected: choice.onSelected || {}
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

    setGroupIds(groupIds);
    setQuestionIds(questionIds);
    setChoiceIds(choiceIds);

    const configs: Configs = groups.map((group): GroupConfigs => ({
      id: group.id,
      defaultDisabled: group.defaultDisabled,
      ui: {
        title: group.title
      },
      questions: group.questions.map((question): QuestionConfigs => ({
        id: question.id,
        defaultDisabled: question.defaultDisabled,
        type: question.type,
        ui: {
          inputType: question.inputType,
          title: question.title,
          placeholder: question.placeholder,
          maxLength: question.maxLength
        },
        validators: question.validators,
        validation: {
          min: question.min,
          max: question.max
        },
        choices: question.choices.map((choice): ChoiceConfigs => ({
          id: choice.id,
          defaultDisabled: choice.defaultDisabled,
          value: choice.value,
          ui: {
            title: choice.title
          },
          onSelected: choice.onSelected
        }))
      }))
    }));

    setConfigs(configs);
  }, [groups]);

  const saveConfigs = () => {
    const result = Form.validateConfigs(configs);
    if (!result.pass) {
      let errorMsg = '';
      Object.entries(result.errors!).forEach(([key, errors]) => {
        errorMsg += `\n${key} - ${errors.join(', ')}`;
      });
      alert(`There are some invalid configs, please fix them before saving.${errorMsg}`);
      return;
    }

    // TODO: need to do more custom validation, e.g. title cannot be empty, etc.

    mockBackend.saveConfigs(configs);
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
      <Button style={{ marginTop: 16, marginLeft: 16 }} type="link" onClick={() => history.push('/')}>&lt; Back</Button>

      <Space direction="vertical" style={{ width: '100%', padding: 32 }}>
        <Collapse>
          {groups.map(group =>
            <Collapse.Panel key={group.uuid}
              header={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>{group.title || 'Untitled'}</div>
                  <div style={{ color: 'red', cursor: 'pointer' }} onClick={event => {
                    removeGroup(group.uuid);
                    event.stopPropagation();
                  }}>Remove</div>
                </div>
              }>
              <Group
                group={group}
                updateGroup={updateGroup}
                groupIds={groupIds}
                questionIds={questionIds}
                choiceIds={choiceIds}
              />
            </Collapse.Panel>
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
