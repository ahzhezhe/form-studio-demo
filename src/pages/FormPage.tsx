import { Button, Collapse, Divider, Space } from 'antd';
import Form, { GroupRenderInstructions, RenderInstructions } from 'form-studio';
import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Question } from '../form-components';
import { mockBackend } from '../mock-backend';
import { validators } from '../validators';

let form: Form;

export const FormPage: FC = () => {
  const history = useHistory();
  const [renderInstructions, setRenderInstructions] = useState<RenderInstructions>([]);
  const [output, setOutput] = useState<any>();

  useEffect(() => {
    const configs = mockBackend.getConfigs();
    form = new Form(configs, validators, true, form => setRenderInstructions(form.getRenderInstructions()));
  }, []);

  const restoreAnswers = () => {
    const answers = mockBackend.getAnswers();
    form.importAnswers(answers);
  };

  const saveAnswers = () => {
    if (!form.validate()) {
      alert('There are some invalid answers, please fix them before saving.');
      return;
    }

    const answers = form.getValidatedAnswers();
    mockBackend.saveAnswers(answers);
    alert('Your answers have been saved.');
  };

  const getConfigs = () => {
    const output = form.getConfigs();
    setOutput(output);
  };

  const getRenderInstructions = () => {
    const output = form.getRenderInstructions();
    setOutput(output);
  };

  const getCurrentAnswers = () => {
    const output = form.getCurrentAnswers();
    setOutput(output);
  };

  const getValidatedAnswers = () => {
    const output = form.getValidatedAnswers();
    setOutput(output);
  };

  const validate = () => {
    const output = form.validate();
    setOutput(output);
  };

  const renderGroup = (group: GroupRenderInstructions) => {
    const { id, disabled, ui, questions } = group;
    const { title } = ui;

    if (disabled) {
      return null;
    }

    return (
      <Collapse.Panel key={id} header={title}>
        <div style={{ padding: 8 }}>
          <Button danger onClick={() => form.clearGroup(id, true)}>Clear This Section</Button>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', rowGap: 32 }}>
            {questions.map(question =>
              <Question key={question.id} form={form} question={question} />
            )}
          </div>
        </div>
      </Collapse.Panel>
    );
  };

  return (
    <>
      <Button style={{ marginTop: 16, marginLeft: 16 }} type="link" onClick={() => history.push('/')}>&lt; Back</Button>

      <Space direction="vertical" style={{ width: '100%', padding: 32 }}>

        <Space>
          <Button danger onClick={() => form.clear(true)}>Clear Entire Form</Button>
          <Button type="primary" ghost onClick={restoreAnswers}>Restore Saved Answers</Button>
        </Space>

        <Collapse style={{ marginTop: 16 }}>
          {renderInstructions.map(group => renderGroup(group))}
        </Collapse>

        <Button style={{ marginTop: 16 }} type="primary" onClick={saveAnswers}>Save Answers</Button>

        <Divider />

        <Space>
          <Button onClick={getConfigs}>Configs</Button>
          <Button onClick={getRenderInstructions}>Render Instructions</Button>
          <Button onClick={validate}>Validate</Button>
          <Button onClick={getCurrentAnswers}>Current Answers</Button>
          <Button onClick={getValidatedAnswers}>Validated Answers</Button>
        </Space>

        <pre style={{ fontSize: 12 }}>{JSON.stringify(output, null, 2)}</pre>
      </Space>
    </>
  );
};
