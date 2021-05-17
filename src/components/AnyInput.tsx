import Form, { QuestionRenderInstructions } from 'form-studio';
import React, { FC } from 'react';
import { Input } from 'antd';
import { Error } from '.';
import { NameInput } from './NameInput';

interface Props {
  form: Form;
  question: QuestionRenderInstructions;
}

export const AnyInput: FC<Props> = ({ form, question }) => {
  const { id, ui, error, currentAnswer } = question;
  const { inputType, title, placeholder, maxLength, sub } = ui;

  const renderInput = () => {
    switch (inputType) {
      case 'string':
        return <Input
          placeholder={placeholder as string}
          maxLength={maxLength as number}
          value={currentAnswer}
          onChange={e => form.setAnswer(id, e.target.value)} />;

      case 'name':
        return <NameInput name={currentAnswer} onChange={name => form.setAnswer(id, name)} />;
    }
  };

  return (
    <div style={{ marginTop: sub ? -24 : undefined, paddingLeft: sub ? 24 : undefined }}>
      <h3>{title}</h3>
      <div>
        {renderInput()}
        <Error>{error?.message}</Error>
      </div>
    </div>
  );
};
