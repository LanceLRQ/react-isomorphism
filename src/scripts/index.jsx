import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';

const render = (Component) => {
  // SSR 的时候用ReactDOM.hydrate，平时开发在dev-server的时候用ReactDOM.render
  const renderer = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderer(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
};

export const Startup = () => {
  render(require('./views/app').IndexApp);
  if (module.hot) {
    module.hot.accept('./views/app', () => {
      render(require('./views/app').IndexApp);
    });
  }
};
