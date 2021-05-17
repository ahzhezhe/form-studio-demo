import Form, { GroupRenderInstructions, QuestionRenderInstructions, RenderInstructions } from 'form-studio';
import React, { FC, useState, useEffect } from 'react';
import { configs, validators, answers } from './FormBuilder';
import { Button, Collapse, Checkbox, Radio, Input } from 'antd';

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

  const getErrors = () => {
    const output = form.getErrors();
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

  const isClean = () => {
    const output = form.isClean();
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
            {questions.map(question => renderQuestion(question))}
          </div>
        </div>
      </Collapse.Panel>
    );
  };

  const renderQuestion = (question: QuestionRenderInstructions) => {
    const { disabled, type, ui } = question;
    const { inputType, title, sub } = ui;

    if (disabled) {
      return null;
    }

    if (type === 'any') {
      return (
        <div style={{ marginTop: sub ? -24 : undefined, paddingLeft: sub ? 24 : undefined }}>
          <h3>{title}</h3>
          {inputType === 'string' && renderStringInput(question)}
        </div>
      );
    }

    if (type === 'single') {
      return (
        <div>
          <h3>{title}</h3>
          {renderRadio(question)}
        </div>
      );
    }

    if (type === 'multiple') {
      return (
        <div>
          <h3>{title}</h3>
          {renderCheckBoxGroup(question)}
        </div >
      );
    }
  };

  const renderRadio = (question: QuestionRenderInstructions) => {
    const { id, choices, error, currentAnswer } = question;

    return (
      <div>
        <Radio.Group
          value={currentAnswer}
          onChange={e => form.setChoice(id, e.target.value)}>
          {choices!.map(choice => (
            <div key={choice.value}>
              <Radio value={choice.value}
                disabled={choice.disabled}>
                {choice.ui.title as string}
              </Radio>
            </div>
          ))}
        </Radio.Group>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    );
  };

  const renderCheckBoxGroup = (question: QuestionRenderInstructions) => {
    const { id, choices, error, currentAnswer } = question;

    return (
      <div>
        <Checkbox.Group
          value={currentAnswer}
          onChange={answer => form.setChoices(id, answer as any[])}>
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
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    );
  };

  const renderStringInput = (question: QuestionRenderInstructions) => {
    const { id, ui, currentAnswer, error } = question;
    const { placeholder, maxLength } = ui;

    return (
      <div>
        <Input
          placeholder={placeholder as string}
          maxLength={maxLength as number}
          value={currentAnswer}
          onChange={e => form.setAnswer(id, e.target.value)} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    );
  };

  return (
    <div style={{ padding: 32 }}>
      <Button onClick={() => form.clear(true)}>Clear Entire Form</Button>

      <Collapse style={{ marginTop: 16 }}>
        {renderInstructions.map(group => renderGroup(group))}
      </Collapse>

      <div style={{ marginTop: 32, columnGap: 8 }}>
        <Button type="primary" onClick={getConfigs}>Configs</Button>
        <Button type="primary" onClick={getRenderInstructions}>Render Instructions</Button>
        <Button type="primary" onClick={validate}>Validate</Button>
        <Button type="primary" onClick={isClean}>Is Clean</Button>
        <Button type="primary" onClick={getErrors}>Errors</Button>
        <Button type="primary" onClick={getCurrentAnswers}>Current Answers</Button>
        <Button type="primary" onClick={getValidatedAnswers}>Validated Answers</Button>
        <Button type="primary" onClick={importAnswers}>Import Answers</Button>
      </div>

      <pre style={{ marginTop: 32, fontSize: 12 }}>{JSON.stringify(output, null, 2)}</pre>
    </div>
  );
};
