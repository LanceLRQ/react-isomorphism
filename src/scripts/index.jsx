import React from 'react';
import ReactDOM from 'react-dom';
import { IndexApp } from './app';

export const Startup = () => {
  ReactDOM.hydrate(
    <IndexApp />,
    document.getElementById('root')
  );
};
