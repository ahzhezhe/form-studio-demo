import { Button, Collapse, Input, Select, Space } from 'antd';
import React, { FC } from 'react';
import shortUuid from 'short-uuid';
import { GroupBuilder, QuestionBuilder } from '../pages';
import { Question } from '.';

interface Props {
  group: GroupBuilder;
  updateGroup: (uuid: string, group: GroupBuilder) => void;
  groupIds: string[];
  questionIds: string[];
  choiceIds: string[];
}

export const Group: FC<Props> = ({ group, updateGroup, groupIds, questionIds, choiceIds }) => {
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
    <Space direction="vertical" style={{ width: '100%', rowGap: 16 }}>
      <div>
        <b>ID (Optional)</b>
        <Input value={id} onChange={e => updateGroup(uuid, { ...group, id: e.target.value })} />
      </div>

      <div>
        <b>Title</b>
        <Input value={title} onChange={e => updateGroup(uuid, { ...group, title: e.target.value })} />
      </div>

      <div>
        <b>Default Disabled</b>
        <Select style={{ width: '100%' }} value={defaultDisabled ? 1 : 0} onChange={value => updateGroup(uuid, { ...group, defaultDisabled: !!value })}>
          <Select.Option value={0}>No</Select.Option>
          <Select.Option value={1}>Yes</Select.Option>
        </Select>
      </div>

      <div>
        <b>Questions</b>
        <Collapse>
          {questions.map(question => (
            <Collapse.Panel key={question.uuid}
              header={(
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <div>{question.title || 'Untitled'}</div>
                  <div style={{ color: 'red', cursor: 'pointer' }} onClick={e => {
                    removeQuestion(question.uuid);
                    e.stopPropagation();
                  }}>Remove</div>
                </div>
              )}>
              <Question
                key={question.uuid}
                question={question}
                updateQuestion={updateQuestion}
                groupIds={groupIds}
                questionIds={questionIds}
                choiceIds={choiceIds}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>

      <Button type="primary" onClick={addQuestion}>+ Add Question</Button>
    </Space>
  );
};
