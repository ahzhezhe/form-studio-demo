import { Input, Select, Space } from 'antd';
import React, { FC } from 'react';
import { ChoiceBuilder } from '../pages';

interface Props {
  choice: ChoiceBuilder;
  updateChoice: (choiceId: string, choice: ChoiceBuilder) => void;
  groupIds: string[];
  questionIds: string[];
  choiceIds: string[];
}

export const Choice: FC<Props> = ({ choice, updateChoice, groupIds, questionIds, choiceIds }) => {
  const { uuid, id, value, title, defaultDisabled, onSelected } = choice;

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
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
        <b>Enable When Selected (Optional)</b>
        <Select style={{ width: '100%' }} mode="multiple" value={onSelected?.enable} onChange={value => updateChoice(uuid, { ...choice, onSelected: { ...onSelected, enable: value.length === 0 ? undefined : value } })}>
          {groupIds.map(id =>
            <Select.Option key={id} value={id}>Group - {id}</Select.Option>
          )}
          {questionIds.map(id =>
            <Select.Option key={id} value={id}>Question - {id}</Select.Option>
          )}
          {choiceIds.map(id =>
            <Select.Option key={id} value={id}>Choice - {id}</Select.Option>
          )}
        </Select>
      </div>

      <div>
        <b>Disable When Selected (Optional)</b>
        <Select style={{ width: '100%' }} mode="multiple" value={onSelected?.disable} onChange={value => updateChoice(uuid, { ...choice, onSelected: { ...onSelected, disable: value.length === 0 ? undefined : value } })}>
          {groupIds.map(id =>
            <Select.Option key={id} value={id}>Group - {id}</Select.Option>
          )}
          {questionIds.map(id =>
            <Select.Option key={id} value={id}>Question - {id}</Select.Option>
          )}
          {choiceIds.map(id =>
            <Select.Option key={id} value={id}>Choice - {id}</Select.Option>
          )}
        </Select>
      </div>
    </Space>
  );
};
