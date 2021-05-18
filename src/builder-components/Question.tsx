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
  const { id, type, ui, defaultDisabled, choices, validators, validation } = question;

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
        <b>Question Title</b>
        <Input value={ui!.title as string} onChange={e => updateQuestion(id!, { ...question, ui: { ...question.ui, title: e.target.value } })} />
      </div>

      <div>
        <b>Question Default Disabled</b>
        <Select style={{ width: '100%' }} value={defaultDisabled ? 1 : 0} onChange={value => updateQuestion(id!, { ...question, defaultDisabled: !!value })}>
          <Select.Option value={0}>No</Select.Option>
          <Select.Option value={1}>Yes</Select.Option>
        </Select>
      </div>

      <div>
        <b>Question Type</b>
        <Select style={{ width: '100%' }} value={type} onChange={type => {
          updateQuestion(id!, { ...question, type, ui: { ...ui, inputType: undefined }, validators: [], validation: {} });
        }}>
          <Select.Option value="any">Input</Select.Option>
          <Select.Option value="single">Radio Button Group</Select.Option>
          <Select.Option value="multiple">Checkbox Group</Select.Option>
        </Select>
      </div>

      {type === 'any' &&
        <div>
          <b>Answer Input Type</b>
          <Select style={{ width: '100%' }} value={ui!.inputType as string} onChange={inputType => {
            updateQuestion(id!, { ...question, ui: { ...question.ui, inputType }, validators: [], validation: {} });
          }}>
            <Select.Option value="string">Text</Select.Option>
          </Select>
        </div>
      }

      {type === 'any' && ui!.inputType === 'string' &&
        <div>
          <b>Answer Validators</b>
          <Select style={{ width: '100%' }} mode="multiple" value={validators} onChange={validators => updateQuestion(id!, { ...question, validators })}>
            <Select.Option value="notNull">Not Empty</Select.Option>
            <Select.Option value="email">Email</Select.Option>
          </Select>
        </div>
      }
      {type === 'single' &&
        <div>
          <b>Answer Validators</b>
          <Select style={{ width: '100%' }} mode="multiple" value={validators} onChange={validators => updateQuestion(id!, { ...question, validators })}>
            <Select.Option value="notNullSingle">Not Empty</Select.Option>
          </Select>
        </div>
      }
      {type === 'multiple' &&
        <div>
          <b>Answer Validators</b>
          <Select style={{ width: '100%' }} mode="multiple" value={validators} onChange={validators => updateQuestion(id!, { ...question, validators })}>
            <Select.Option value="notNullMultiple">Not Empty</Select.Option>
          </Select>
        </div>
      }

      {type === 'multiple' && validators!.includes('notNullMultiple') &&
        <>
          <div>
            <b>Answer Minimum Selection</b>
            <Input type="number" value={validation!.min as number} onChange={e => updateQuestion(id!, { ...question, validation: { ...question.validation, min: e.target.value } })} />
          </div>
          <div>
            <b>Answer Maximum Selection</b>
            <Input type="number" value={validation!.max as number} onChange={e => updateQuestion(id!, { ...question, validation: { ...question.validation, max: e.target.value } })} />
          </div>
        </>
      }

      {type === 'any' && ui!.inputType === 'string' &&
        <>
          <div>
            <b>Answer Maximum Length</b>
            <Input type="number" value={ui!.maxLength as number} onChange={e => updateQuestion(id!, { ...question, ui: { ...question.ui, maxLength: e.target.value } })} />
          </div>
        </>
      }

      {type !== 'any' &&
        <Button type="primary" ghost onClick={addChoice}>+ Add Choice</Button>
      }

      <Button danger onClick={() => removeQuestion(id!)}>Remove Question</Button>
    </Space>
  );
};
