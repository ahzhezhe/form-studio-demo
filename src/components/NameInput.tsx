import React, { FC } from 'react';
import { Input } from 'antd';

interface Name {
  firstName: string;
  lastName: string;
}

interface Props {
  name: Name;
  onChange: (name: Name) => void;
}

export const NameInput: FC<Props> = ({ name, onChange }) => (
  <div style={{ display: 'flex', columnGap: 16 }}>
    <Input
      style={{ maxWidth: 250 }}
      placeholder="First Name"
      maxLength={50}
      value={name?.firstName}
      onChange={e => onChange({ ...name, firstName: e.target.value })} />
    <Input
      style={{ maxWidth: 250 }}
      placeholder="Last Name"
      maxLength={50}
      value={name?.lastName}
      onChange={e => onChange({ ...name, lastName: e.target.value })} />
  </div>
);
