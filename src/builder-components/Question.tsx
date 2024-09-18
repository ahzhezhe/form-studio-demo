import { Button, Collapse, Input, Select, Space } from 'antd';
import React, { FC } from 'react';
import shortUuid from 'short-uuid';
import { ChoiceBuilder, QuestionBuilder } from '../pages';
import { Choice } from '.';

interface Props {
  question: QuestionBuilder;
  updateQuestion: (uuid: string, question: QuestionBuilder) => void;
  choiceIds: string[];
}

export const Question: FC<Props> = ({ question, updateQuestion, choiceIds }) => {
  const {
    uuid, id, type, inputType, title, placeholder, defaultDisabled, enabledOnSelected, disabledOnSelected,
    choices, validators, maxLength, min, max
  } = question;

  const addChoice = () => {
    updateQuestion(uuid, {
      ...question, choices: [...choices!, {
        uuid: shortUuid.generate(),
        defaultDisabled: false,
        value: '',
        title: ''
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
    <Space direction="vertical" style={{ width: '100%', rowGap: 16 }}>
      <div>
        <b>ID (Optional)</b>
        <Input value={id} onChange={e => updateQuestion(uuid, { ...question, id: e.target.value })} />
      </div>

      <div>
        <b>Title</b>
        <Input value={title} onChange={e => updateQuestion(uuid, { ...question, title: e.target.value })} />
      </div>

      <div>
        <b>Default Disabled</b>
        <Select style={{ width: '100%' }} value={defaultDisabled ? 1 : 0} onChange={value => updateQuestion(uuid, { ...question, defaultDisabled: !!value })}>
          <Select.Option value={0}>No</Select.Option>
          <Select.Option value={1}>Yes</Select.Option>
        </Select>
      </div>

      <div>
        <b>Enabled When Choices Are Selected (Optional)</b>
        <Select style={{ width: '100%' }} mode="multiple" value={enabledOnSelected} onChange={enabledOnSelected => updateQuestion(uuid, { ...question, enabledOnSelected })}>
          {choiceIds.map(id =>
            <Select.Option key={id} value={id}>{id}</Select.Option>
          )}
        </Select>
      </div>

      <div>
        <b>Disabled When Choices Are Selected (Optional)</b>
        <Select style={{ width: '100%' }} mode="multiple" value={disabledOnSelected} onChange={disabledOnSelected => updateQuestion(uuid, { ...question, disabledOnSelected })}>
          {choiceIds.map(id =>
            <Select.Option key={id} value={id}>{id}</Select.Option>
          )}
        </Select>
      </div>

      <div>
        <b>Type</b>
        <Select style={{ width: '100%' }} value={type} onChange={type => {
          updateQuestion(uuid, { ...question, type, inputType: undefined, validators: [], maxLength: undefined, min: undefined, max: undefined });
        }}>
          <Select.Option value="any">Input</Select.Option>
          <Select.Option value="choice">Radio Button Group</Select.Option>
          <Select.Option value="choices">Checkbox Group</Select.Option>
        </Select>
      </div>

      {type === 'any' && (
        <>
          <div>
            <b>Input Type</b>
            <Select style={{ width: '100%' }} value={inputType} onChange={inputType => {
              updateQuestion(uuid, { ...question, inputType, validators: [], maxLength: undefined, min: undefined, max: undefined });
            }}>
              <Select.Option value="string">Text</Select.Option>
            </Select>
          </div>
          <div>
            <b>Placeholder (Optional)</b>
            <Input value={placeholder} onChange={e => updateQuestion(uuid, { ...question, placeholder: e.target.value })} />
          </div>
        </>
      )}

      {type === 'any' && inputType === 'string' && (
        <div>
          <b>Validators (Optional)</b>
          <Select style={{ width: '100%' }} mode="multiple" value={validators} onChange={validators => updateQuestion(uuid, { ...question, validators })}>
            <Select.Option value="notNull">Not Empty</Select.Option>
            <Select.Option value="email">Email</Select.Option>
          </Select>
        </div>
      )}

      {type === 'choice' && (
        <div>
          <b>Validators (Optional)</b>
          <Select style={{ width: '100%' }} mode="multiple" value={validators} onChange={validators => updateQuestion(uuid, { ...question, validators })}>
            <Select.Option value="notNullSingle">Not Empty</Select.Option>
          </Select>
        </div>
      )}

      {type === 'choices' && (
        <div>
          <b>Validators (Optional)</b>
          <Select style={{ width: '100%' }} mode="multiple" value={validators} onChange={validators => updateQuestion(uuid, { ...question, validators })}>
            <Select.Option value="notNullMultiple">Not Empty</Select.Option>
          </Select>
        </div>
      )}

      {type === 'choices' && validators!.includes('notNullMultiple') && (
        <>
          <div>
            <b>Minimum Choices (Optional)</b>
            <Input type="number" value={min} onChange={e => updateQuestion(uuid, { ...question, min: Number(e.target.value) })} />
          </div>
          <div>
            <b>Maximum Choices (Optional)</b>
            <Input type="number" value={max} onChange={e => updateQuestion(uuid, { ...question, max: Number(e.target.value) })} />
          </div>
        </>
      )}

      {type === 'any' && inputType === 'string' && (
        <>
          <div>
            <b>Maximum Length (Optional)</b>
            <Input type="number" value={maxLength} onChange={e => updateQuestion(uuid, { ...question, maxLength: Number(e.target.value) })} />
          </div>
        </>
      )}

      {type !== 'any' && (
        <>
          <div>
            <b>Choices</b>
            <Collapse>
              {choices.map(choice => (
                <Collapse.Panel key={choice.uuid}
                  header={(
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                      <div>{choice.title || 'Untitled'}</div>
                      <div style={{ color: 'red', cursor: 'pointer' }} onClick={e => {
                        removeChoice(choice.uuid);
                        e.stopPropagation();
                      }}>Remove</div>
                    </div>
                  )}>
                  <Choice
                    key={choice.uuid}
                    choice={choice}
                    updateChoice={updateChoice}
                    choiceIds={choiceIds}
                  />
                </Collapse.Panel>
              )
              )}
            </Collapse>
          </div>
          <Button type="primary" onClick={addChoice}>+ Add Choice</Button>
        </>
      )}
    </Space>
  );
};
