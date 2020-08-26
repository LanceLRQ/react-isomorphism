import React from 'react';
import ReactDOM from 'react-dom';
import { IndexApp } from './app';

export const Startup = () => {
  ReactDOM.render(
    <IndexApp />,
    document.getElementById('root')
  );
};
