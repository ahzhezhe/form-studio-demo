import { Button, Input, Select, Space } from 'antd';
import React, { FC } from 'react';
import shortUuid from 'short-uuid';
import { Question } from '.';
import { GroupBuilder, QuestionBuilder } from '../pages';

interface Props {
  group: GroupBuilder;
  updateGroup: (uuid: string, group: GroupBuilder) => void;
  removeGroup: (uuid: string) => void;
  groupIds: string[];
  questionIds: string[];
  choiceIds: string[];
}

export const Group: FC<Props> = ({ group, updateGroup, removeGroup, groupIds, questionIds, choiceIds }) => {
  const { uuid, id, defaultDisabled, title, questions } = group;

  const updateQuestion = (uuid: string, question: QuestionBuilder) => {
    const newQuestions = questions!.map(q => q.uuid !== uuid ? q : question);
    updateGroup(group.uuid, { ...group, questions: newQuestions });
  };

  const removeQuestion = (uuid: string) => {
    const newQuestions = questions!.filter(q => q.uuid !== uuid);
    updateGroup(group.uuid, { ...group, questions: newQuestions });
  };

  const addQuestion = () => {
    updateGroup(uuid, {
      ...group, questions: [...questions!, {
        uuid: shortUuid.generate(),
        defaultDisabled: false,
        type: 'any',
        choices: [],
        validators: [],
        title: ''
      }]
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>
        <b>Group ID (Auto-generated if left blank)</b>
        <Input value={id} onChange={e => updateGroup(uuid, { ...group, id: e.target.value })} />
      </div>

      <div>
        <b>Group Title</b>
        <Input value={title} onChange={e => updateGroup(uuid, { ...group, title: e.target.value })} />
      </div>

      <div>
        <b>Group Default Disabled</b>
        <Select style={{ width: '100%' }} value={defaultDisabled ? 1 : 0} onChange={value => updateGroup(uuid, { ...group, defaultDisabled: !!value })}>
          <Select.Option value={0}>No</Select.Option>
          <Select.Option value={1}>Yes</Select.Option>
        </Select>
      </div>

      <div>
        <b>Questions</b>
        <Space direction="vertical" style={{ width: '100%' }}>
          {questions!.map(question =>
            <Question
              key={question.uuid}
              question={question}
              updateQuestion={updateQuestion}
              removeQuestion={removeQuestion}
              groupIds={groupIds}
              questionIds={questionIds}
              choiceIds={choiceIds}
            />
          )}
        </Space>
      </div>

      <Button type="primary" onClick={addQuestion}>+ Add Question</Button>

      <Button danger onClick={() => removeGroup(uuid)}>Remove Group</Button>
    </Space>
  );
};
