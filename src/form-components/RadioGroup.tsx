import Form, { QuestionRenderInstructions } from 'form-studio';
import React, { FC } from 'react';
import { Radio } from 'antd';
import { Error } from '.';

interface Props {
  form: Form;
  question: QuestionRenderInstructions;
}

export const RadioGroup: FC<Props> = ({ form, question }) => {
  const { id, choices, ui, error, currentAnswer } = question;

  return (
    <div>
      <h3>{ui.title}</h3>
      <div>
        <Radio.Group
          value={currentAnswer}
          onChange={e => form.setChoice(id, e.target.value)}>
          {choices!.map(choice => (
            <div key={choice.id}>
              <Radio value={choice.value}
                disabled={choice.disabled}>
                {choice.ui.title as string}
              </Radio>
            </div>
          ))}
        </Radio.Group>
        <Error>{error?.message}</Error>
      </div>
    </div>
  );
};