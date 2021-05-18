import { Button, Input, Select, Space } from 'antd';
import { QuestionConfigs } from 'form-studio';
import React, { FC } from 'react';
import shortUuid from 'short-uuid';

interface Props {
  question: QuestionConfigs;
  updateQuestion: (questionId: string, question: QuestionConfigs) => void;
  removeQuestion: (questionId: string) => void;
}

export const Question: FC<Props> = ({ question, updateQuestion, removeQuestion }) => {
  const { id, type, ui, defaultDisabled, choices } = question;
  const { title } = ui!;

  const addChoice = () => {
    updateQuestion(id!, {
      ...question, choices: [...choices!, {
        id: shortUuid.generate(),
        defaultDisabled: false,
        value: '',
        ui: { title: '' }
      }]
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%', backgroundColor: '#F3F3F3', padding: 16 }}>
      <div>
        <b>Question ID</b>
        <Input value={id} onChange={e => updateQuestion(id!, { ...question, id: e.target.value })} />
      </div>

      <div>
        <b>Question Type</b>
        <Select style={{ width: '100%' }} value={type} onChange={type => updateQuestion(id!, { ...question, type })}>
          <Select.Option value="any">Input</Select.Option>
          <Select.Option value="single">Radio Group</Select.Option>
          <Select.Option value="multiple">Checkbox Group</Select.Option>
        </Select>
      </div>

      {/* {type === 'any' &&
          <div>
          <b>Question Input Type</b>
          <Select value={type} onChange={value => setType(value)}>
            <Select.Option value="any">Input</Select.Option>
            <Select.Option value="single">Radio Group</Select.Option>
            <Select.Option value="multiple">Checkbox Group</Select.Option>
          </Select>
          </div>
      } */}

      <div>
        <b>Question Title</b>
        <Input value={title as string} onChange={e => updateQuestion(id!, { ...question, ui: { ...question.ui, title: e.target.value } })} />
      </div>

      <div>
        <b>Question Default Disabled</b>
        <Select style={{ width: '100%' }} value={defaultDisabled ? 1 : 0} onChange={value => updateQuestion(id!, { ...question, defaultDisabled: !!value })}>
          <Select.Option value={0}>No</Select.Option>
          <Select.Option value={1}>Yes</Select.Option>
        </Select>
      </div>

      {type !== 'any' &&
        <Button type="primary" ghost onClick={addChoice}>+ Add Choice</Button>
      }

      <Button danger onClick={() => removeQuestion(id!)}>Remove Question</Button>
    </Space>
  );
};
