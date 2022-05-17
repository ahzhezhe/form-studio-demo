import { Checkbox } from 'antd';
import { Form, QuestionRenderInstructions } from 'form-studio';
import React, { FC } from 'react';
import { Error } from '.';

interface Props {
  form: Form;
  question: QuestionRenderInstructions;
}

export const CheckboxGroup: FC<Props> = ({ form, question }) => {
  const { id, choices, custom, error, currentAnswer } = question;

  return (
    <div>
      <h3>{custom.title}</h3>
      <Checkbox.Group
        value={currentAnswer as any}
        onChange={values => form.setAnswer(id, values)}>
        {choices!.map(choice => (
          <div key={choice.id}>
            <Checkbox
              value={choice.value}
              disabled={choice.disabled}>
              {choice.custom.title}
            </Checkbox>
          </div>
        ))}
      </Checkbox.Group>
      <Error>{(error as Error)?.message}</Error>
    </div>
  );
};
