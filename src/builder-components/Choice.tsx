import { Input, Select, Space } from 'antd';
import React, { FC } from 'react';
import { ChoiceBuilder } from '../pages';

interface Props {
  choice: ChoiceBuilder;
  updateChoice: (choiceId: string, choice: ChoiceBuilder) => void;
  choiceIds: string[];
}

export const Choice: FC<Props> = ({ choice, updateChoice, choiceIds }) => {
  const { uuid, id, value, title, defaultDisabled, enabledOnSelected, disabledOnSelected } = choice;

  return (
    <Space direction="vertical" style={{ width: '100%', rowGap: 16 }}>
      <div>
        <b>ID (Optional)</b>
        <Input value={id} onChange={e => updateChoice(uuid, { ...choice, id: e.target.value })} />
      </div>

      <div>
        <b>Value</b>
        <Input value={value} onChange={e => updateChoice(uuid, { ...choice, value: e.target.value })} />
      </div>

      <div>
        <b>Title</b>
        <Input value={title} onChange={e => updateChoice(uuid, { ...choice, title: e.target.value })} />
      </div>

      <div>
        <b>Default Disabled</b>
        <Select style={{ width: '100%' }} value={defaultDisabled ? 1 : 0} onChange={value => updateChoice(uuid, { ...choice, defaultDisabled: !!value })}>
          <Select.Option value={0}>No</Select.Option>
          <Select.Option value={1}>Yes</Select.Option>
        </Select>
      </div>

      <div>
        <b>Enabled When Choices Are Selected (Optional)</b>
        <Select style={{ width: '100%' }} mode="multiple" value={enabledOnSelected} onChange={enabledOnSelected => updateChoice(uuid, { ...choice, enabledOnSelected })}>
          {choiceIds.map(id =>
            <Select.Option key={id} value={id}>{id}</Select.Option>
          )}
        </Select>
      </div>

      <div>
        <b>Disabled When Choices Are Selected (Optional)</b>
        <Select style={{ width: '100%' }} mode="multiple" value={disabledOnSelected} onChange={disabledOnSelected => updateChoice(uuid, { ...choice, disabledOnSelected })}>
          {choiceIds.map(id =>
            <Select.Option key={id} value={id}>{id}</Select.Option>
          )}
        </Select>
      </div>
    </Space>
  );
};
