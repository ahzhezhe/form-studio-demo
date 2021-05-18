import { Button, Input, Select, Space } from 'antd';
import React, { FC } from 'react';
import shortUuid from 'short-uuid';
import { Choice } from '.';
import { ChoiceBuilder, QuestionBuilder } from '../pages';

interface Props {
  question: QuestionBuilder;
  updateQuestion: (uuid: string, question: QuestionBuilder) => void;
  removeQuestion: (uuid: string) => void;
  groupIds: string[];
  questionIds: string[];
  choiceIds: string[];
}

export const Question: FC<Props> = ({ question, updateQuestion, removeQuestion, groupIds, questionIds, choiceIds }) => {
  const { uuid, id, type, inputType, title, placeholder, defaultDisabled, choices, validators, maxLength, min, max } = question;

  const addChoice = () => {
    updateQuestion(uuid, {
      ...question, choices: [...choices!, {
        uuid: shortUuid.generate(),
        defaultDisabled: false,
        value: '',
        title: '',
        onSelected: { }
      }]
    });
  };

  const updateChoice = (uuid: string, choice: ChoiceBuilder) => {
    const newChoices = choices!.map(c => c.uuid !== uuid ? c : choice);
    updateQuestion(question.uuid, { ...question, choices: newChoices });
  };

  const removeChoice = (uuid: string) => {
    const newChoices = choices!.filter(c => c.uuid !== uuid);
    updateQuestion(question.uuid, { ...question, choices: newChoices });
  };

  return (
    <Space direction="vertical" style={{ width: '100%', backgroundColor: '#F0F0F0', padding: 16 }}>
      <div>
        <b>Question ID (Auto-generated if left blank)</b>
        <Input value={id} onChange={e => updateQuestion(uuid, { ...question, id: e.target.value })} />
      </div>

      <div>
        <b>Question Title</b>
        <Input value={title} onChange={e => updateQuestion(uuid, { ...question, title: e.target.value })} />
      </div>

      <div>
        <b>Question Default Disabled</b>
        <Select style={{ width: '100%' }} value={defaultDisabled ? 1 : 0} onChange={value => updateQuestion(uuid, { ...question, defaultDisabled: !!value })}>
          <Select.Option value={0}>No</Select.Option>
          <Select.Option value={1}>Yes</Select.Option>
        </Select>
      </div>

      <div>
        <b>Question Type</b>
        <Select style={{ width: '100%' }} value={type} onChange={type => {
          updateQuestion(uuid, { ...question, type, inputType: undefined, validators: [], maxLength: undefined, min: undefined, max: undefined });
        }}>
          <Select.Option value="any">Input</Select.Option>
          <Select.Option value="single">Radio Button Group</Select.Option>
          <Select.Option value="multiple">Checkbox Group</Select.Option>
        </Select>
      </div>

      {type === 'any' &&
      <>
        <div>
          <b>Answer Input Type</b>
          <Select style={{ width: '100%' }} value={inputType} onChange={inputType => {
            updateQuestion(uuid, { ...question, inputType, validators: [], maxLength: undefined, min: undefined, max: undefined });
          }}>
            <Select.Option value="string">Text</Select.Option>
          </Select>
        </div>
        <div>
          <b>Answer Placeholder (Optional)</b>
          <Input value={placeholder} onChange={e => updateQuestion(uuid, { ...question, placeholder: e.target.value })} />
        </div>
      </>
      }

      {type === 'any' && inputType === 'string' &&
        <div>
          <b>Answer Validators</b>
          <Select style={{ width: '100%' }} mode="multiple" value={validators} onChange={validators => updateQuestion(uuid, { ...question, validators })}>
            <Select.Option value="notNull">Not Empty</Select.Option>
            <Select.Option value="email">Email</Select.Option>
          </Select>
        </div>
      }
      {type === 'single' &&
        <div>
          <b>Answer Validators</b>
          <Select style={{ width: '100%' }} mode="multiple" value={validators} onChange={validators => updateQuestion(uuid, { ...question, validators })}>
            <Select.Option value="notNullSingle">Not Empty</Select.Option>
          </Select>
        </div>
      }
      {type === 'multiple' &&
        <div>
          <b>Answer Validators</b>
          <Select style={{ width: '100%' }} mode="multiple" value={validators} onChange={validators => updateQuestion(uuid, { ...question, validators })}>
            <Select.Option value="notNullMultiple">Not Empty</Select.Option>
          </Select>
        </div>
      }

      {type === 'multiple' && validators!.includes('notNullMultiple') &&
        <>
          <div>
            <b>Answer Minimum Choices (Optional)</b>
            <Input type="number" value={min} onChange={e => updateQuestion(uuid, { ...question, min: Number(e.target.value) })} />
          </div>
          <div>
            <b>Answer Maximum Choices (Optional)</b>
            <Input type="number" value={max} onChange={e => updateQuestion(uuid, { ...question, max: Number(e.target.value) })} />
          </div>
        </>
      }

      {type === 'any' && inputType === 'string' &&
        <>
          <div>
            <b>Answer Maximum Length (Optional)</b>
            <Input type="number" value={maxLength} onChange={e => updateQuestion(uuid, { ...question, maxLength: Number(e.target.value) })} />
          </div>
        </>
      }

      {type !== 'any' &&
        <>
          <div>
            <b>Choices</b>
            <Space direction="vertical" style={{ width: '100%' }}>
              {choices!.map(choice =>
                <Choice
                  key={choice.uuid}
                  choice={choice}
                  updateChoice={updateChoice}
                  removeChoice={removeChoice}
                  groupIds={groupIds}
                  questionIds={questionIds}
                  choiceIds={choiceIds}
                />
              )}
            </Space>
          </div>
          <Button type="primary" onClick={addChoice}>+ Add Choice</Button>
        </>
      }

      <Button danger onClick={() => removeQuestion(uuid)}>Remove Question</Button>
    </Space>
  );
};
