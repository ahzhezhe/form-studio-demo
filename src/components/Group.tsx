import Form, { GroupRenderInstructions } from 'form-studio';
import React, { FC } from 'react';
import { Button, Collapse } from 'antd';
import { Question } from '.';

interface Props {
  form: Form;
  group: GroupRenderInstructions;
}

export const Group: FC<Props> = ({ form, group }) => {
  const { id, disabled, ui, questions } = group;
  const { title } = ui;

  if (disabled) {
    return null;
  }

  return (
    <Collapse.Panel key={id} header={title}>
      <div style={{ padding: 8 }}>
        <Button onClick={() => form.clearGroup(id, true)}>Clear This Section</Button>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', rowGap: 32 }}>
          {questions.map(question =>
            <Question key={question.id} form={form} question={question} />
          )}
        </div>
      </div>
    </Collapse.Panel>
  );
};
