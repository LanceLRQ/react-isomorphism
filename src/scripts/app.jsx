import '@/styles/index.scss';

import React from 'react';
import { TsApp } from './test.tsx';

export const IndexApp = () => {
  return <div>
    <span className="title">
      Congratulation, Your ReactJS application is Running.
    </span>
    <TsApp />
  </div>
};
