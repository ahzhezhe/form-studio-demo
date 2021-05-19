import Form, { QuestionRenderInstructions } from 'form-studio';
import React, { FC } from 'react';
import { AnyInput, CheckboxGroup, RadioGroup } from '.';

interface Props {
  form: Form;
  question: QuestionRenderInstructions;
}

export const Question: FC<Props> = ({ form, question }) => {
  const { disabled, type } = question;

  if (disabled) {
    return null;
  }

  if (type === 'any') {
    return <AnyInput form={form} question={question} />;
  }
  if (type === 'choice') {
    return <RadioGroup form={form} question={question} />;
  }
  if (type === 'choices') {
    return <CheckboxGroup form={form} question={question} />;
  }

  return null;
};
