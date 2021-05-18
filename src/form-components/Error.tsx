import React, { FC } from 'react';

interface Props {
  children?: string;
}

export const Error: FC<Props> = ({ children }) => {
  if (!children) {
    return null;
  }
  return <div style={{ color: 'red' }}>{children}</div>;
};
