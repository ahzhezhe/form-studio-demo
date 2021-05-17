import Form, { ChoiceValue, QuestionRenderInstructions } from 'form-studio';
import React, { FC } from 'react';
import { Checkbox } from 'antd';
import { Error } from '.';

interface Props {
  form: Form;
  question: QuestionRenderInstructions;
}

export const CheckboxGroup: FC<Props> = ({ form, question }) => {
  const { id, choices, ui, error, currentAnswer } = question;

  return (
    <div>
      <h3>{ui.title}</h3>
      <Checkbox.Group
        value={currentAnswer}
        onChange={values => form.setChoices(id, values as ChoiceValue[])}>
        {choices!.map(choice => (
          <div key={choice.value}>
            <Checkbox
              value={choice.value}
              disabled={choice.disabled}>
              {choice.ui.title as string}
            </Checkbox>
          </div>
        ))}
      </Checkbox.Group>
      <Error>{error?.message}</Error>
    </div>
  );
};
