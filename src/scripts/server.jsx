import React from 'react';
import { renderToString } from 'react-dom/server';
import { IndexApp } from './app';

export const Startup = () => renderToString(<IndexApp />);
