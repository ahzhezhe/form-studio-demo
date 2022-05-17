import { Radio } from 'antd';
import { Form, QuestionRenderInstructions } from 'form-studio';
import React, { FC } from 'react';
import { Error } from '.';

interface Props {
  form: Form;
  question: QuestionRenderInstructions;
}

export const RadioGroup: FC<Props> = ({ form, question }) => {
  const { id, choices, custom, error, currentAnswer } = question;

  return (
    <div>
      <h3>{custom.title}</h3>
      <div>
        <Radio.Group
          value={currentAnswer}
          onChange={e => form.setAnswer(id, e.target.value)}>
          {choices!.map(choice => (
            <div key={choice.id}>
              <Radio value={choice.value}
                disabled={choice.disabled}>
                {choice.custom.title}
              </Radio>
            </div>
          ))}
        </Radio.Group>
        <Error>{(error as Error)?.message}</Error>
      </div>
    </div>
  );
};
