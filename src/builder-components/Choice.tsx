import { Button, Input, Select, Space } from 'antd';
import { ChoiceConfigs } from 'form-studio';
import React, { FC } from 'react';

interface Props {
  choice: ChoiceConfigs;
  updateChoice: (choiceId: string, choice: ChoiceConfigs) => void;
  removeChoice: (choiceId: string) => void;
  groupIds: string[];
  questionIds: string[];
  choiceIds: string[];
}

export const Choice: FC<Props> = ({ choice, updateChoice, removeChoice, groupIds, questionIds, choiceIds }) => {
  const { id, value, ui, defaultDisabled, onSelected } = choice;

  return (
    <Space direction="vertical" style={{ width: '100%', backgroundColor: '#DDDDDD', padding: 16 }}>
      <div>
        <b>Choice ID</b>
        <Input value={id} onChange={e => updateChoice(id!, { ...choice, id: e.target.value })} />
      </div>

      <div>
        <b>Choice Value</b>
        <Input value={value as string} onChange={e => updateChoice(id!, { ...choice, value: e.target.value })} />
      </div>

      <div>
        <b>Choice Title</b>
        <Input value={ui!.title as string} onChange={e => updateChoice(id!, { ...choice, ui: { ...choice.ui, title: e.target.value } })} />
      </div>

      <div>
        <b>Choice Default Disabled</b>
        <Select style={{ width: '100%' }} value={defaultDisabled ? 1 : 0} onChange={value => updateChoice(id!, { ...choice, defaultDisabled: !!value })}>
          <Select.Option value={0}>No</Select.Option>
          <Select.Option value={1}>Yes</Select.Option>
        </Select>
      </div>

      <div>
        <b>Choice On Select Enable</b>
        <Select style={{ width: '100%' }} mode="multiple" value={onSelected?.enable} onChange={value => updateChoice(id!, { ...choice, onSelected: { ...onSelected, enable: value.length === 0 ? undefined : value } })}>
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
        <b>Choice On Select Disable</b>
        <Select style={{ width: '100%' }} mode="multiple" value={onSelected?.disable} onChange={value => updateChoice(id!, { ...choice, onSelected: { ...onSelected, disable: value.length === 0 ? undefined : value } })}>
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

      <Button danger onClick={() => removeChoice(id!)}>Remove Choice</Button>
    </Space>
  );
};
