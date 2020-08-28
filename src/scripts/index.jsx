import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const render = (Component) => {
  // SSR 的时候用ReactDOM.hydrate，平时开发在dev-server的时候用ReactDOM.render
  const renderer = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderer(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
    document.getElementById('root')
  );
};

export const Startup = () => {
  render(require('./app').IndexApp);
  if (module.hot) {
    module.hot.accept('./app', () => {
      render(require('./app').IndexApp);
    });
  }
};
