import { Form, QuestionRenderInstructions } from 'form-studio';
import React, { FC } from 'react';
import { Input } from 'antd';
import { Error } from '.';

interface Props {
  form: Form;
  question: QuestionRenderInstructions;
}

export const AnyInput: FC<Props> = ({ form, question }) => {
  const { id, custom, error, currentAnswer } = question;
  const { inputType, title, placeholder, maxLength, sub } = custom;

  const renderInput = () => {
    switch (inputType) {
      case 'string':
        return <Input
          placeholder={placeholder}
          maxLength={maxLength}
          value={currentAnswer}
          onChange={e => form.setAnswer(id, e.target.value)} />;
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
