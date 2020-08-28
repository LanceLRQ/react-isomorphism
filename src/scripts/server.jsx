import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IndexApp } from './views/app';
import { store } from './store/index';

export const Startup = (path) => renderToString(
  <Provider store={store}>
    <StaticRouter location={path}>
      <IndexApp />
    </StaticRouter>
  </Provider>
);
