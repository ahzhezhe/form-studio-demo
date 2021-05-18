import { Button, Input, Select, Space } from 'antd';
import { GroupConfigs, QuestionConfigs } from 'form-studio';
import React, { FC } from 'react';
import { Question } from '.';
import shortUuid from 'short-uuid';

interface Props {
  group: GroupConfigs;
  updateGroup: (groupId: string, group: GroupConfigs) => void;
  removeGroup: (groupId: string) => void;
  groupIds: string[];
  questionIds: string[];
  choiceIds: string[];
}

export const Group: FC<Props> = ({ group, updateGroup, removeGroup, groupIds, questionIds, choiceIds }) => {
  const { id, defaultDisabled, ui, questions } = group;
  const { title } = ui!;

  const updateQuestion = (questionId: string, question: QuestionConfigs) => {
    const newQuestions = questions!.map(q => q.id !== questionId ? q : question);
    updateGroup(id!, { ...group, questions: newQuestions });
  };

  const removeQuestion = (questionId: string) => {
    const newQuestions = questions!.filter(q => q.id !== questionId);
    updateGroup(id!, { ...group, questions: newQuestions });
  };

  const addQuestion = () => {
    updateGroup(id!, {
      ...group, questions: [...questions!, {
        id: shortUuid.generate(),
        defaultDisabled: false,
        type: 'any',
        choices: [],
        validators: [],
        validation: {},
        ui: { title: '' }
      }]
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>
        <b>Group ID</b>
        <Input value={id} onChange={e => updateGroup(id!, { ...group, id: e.target.value })} />
      </div>

      <div>
        <b>Group Title</b>
        <Input value={title as string} onChange={e => updateGroup(id!, { ...group, ui: { ...group.ui, title: e.target.value } })} />
      </div>

      <div>
        <b>Group Default Disabled</b>
        <Select style={{ width: '100%' }} value={defaultDisabled ? 1 : 0} onChange={value => updateGroup(id!, { ...group, defaultDisabled: !!value })}>
          <Select.Option value={0}>No</Select.Option>
          <Select.Option value={1}>Yes</Select.Option>
        </Select>
      </div>

      <div>
        <b>Questions</b>
        <Space direction="vertical" style={{ width: '100%' }}>
          {questions!.map(question =>
            <Question
              key={question.id}
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

      <Button type="primary" ghost onClick={addQuestion}>+ Add Question</Button>

      <Button danger onClick={() => removeGroup(id!)}>Remove Group</Button>
    </Space>
  );
};
