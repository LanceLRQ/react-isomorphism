import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { IndexApp } from './app';

export const Startup = (path) => renderToString(
  <StaticRouter location={path}>
    <IndexApp />
  </StaticRouter>
);
