import Form, { GroupRenderInstructions, RenderInstructions } from 'form-studio';
import React, { FC, useState, useEffect } from 'react';
import { configs, validators, answers } from './FormConfigs';
import { Button, Collapse, Space } from 'antd';
import { Question } from './components';

import 'antd/dist/antd.css';

let form: Form;

export const App: FC = () => {
  const [renderInstructions, setRenderInstructions] = useState<RenderInstructions>([]);
  const [output, setOutput] = useState<any>();

  useEffect(() => {
    form = new Form(configs, validators, true, form => setRenderInstructions(form.getRenderInstructions()));
  }, []);

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

  const importAnswers = () => {
    form.importAnswers(answers);
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

  return (
    <div style={{ padding: 32 }}>
      <Button onClick={() => form.clear(true)}>Clear Entire Form</Button>

      <Collapse style={{ marginTop: 16 }}>
        {renderInstructions.map(group =>
          renderGroup(group)
        )}
      </Collapse>

      <Space style={{ marginTop: 32 }}>
        <Button type="primary" onClick={getConfigs}>Configs</Button>
        <Button type="primary" onClick={getRenderInstructions}>Render Instructions</Button>
        <Button type="primary" onClick={validate}>Validate</Button>
        <Button type="primary" onClick={getCurrentAnswers}>Current Answers</Button>
        <Button type="primary" onClick={getValidatedAnswers}>Validated Answers</Button>
        <Button type="primary" onClick={importAnswers}>Import Answers</Button>
      </Space>

      <pre style={{ marginTop: 32, fontSize: 12 }}>{JSON.stringify(output, null, 2)}</pre>
    </div>
  );
};
