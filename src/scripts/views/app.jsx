import '@/styles/index.scss';

import React from 'react';
import { useSelector, useDispatch }  from 'react-redux';
import { updateCounter } from '../store/sagas';
import {
  Link, Switch,
  Route, withRouter
} from 'react-router-dom';
import classnames from 'classnames';
import { TsApp } from './test';

export const IndexApp = withRouter((props) => {
  const counter = useSelector((state) => state.test.counter);
  const dispatch = useDispatch();
  const handlePlus = () => {
    dispatch(updateCounter({ counter: counter + 1 }));
  };
  const { pathname } = props.location;
  return <div>
    <div className="title">
      Congratulation, Your ReactJS application is Running.
    </div>
    <div className="navigator">
      <Link className={classnames('link', { current: pathname === '/' })} to="/">Index</Link>
      <Link className={classnames('link', { current: pathname === '/page1' })} to="/page1">Counter</Link>
      <Link className={classnames('link', { current: pathname === '/page2' })} to="/page2">Page 2</Link>
      <Link className={classnames('link', { current: pathname === '/typescript' })} to="/typescript">Typescript</Link>
    </div>
    <div className="container">
      <Switch>
        <Route
          path="/page1"
          render={() => <div>
            Counter: {counter}
            <div>
              <button type="button" onClick={handlePlus}>Plus!</button>
            </div>
          </div>}
        />
        <Route
          path="/page2"
          render={() => <div>This is page 2.</div>}
        />
        <Route
          path="/typescript"
          render={() => <TsApp />}
        />
        <Route render={() => <div>This is index page.</div>} />
      </Switch>
    </div>
  </div>;
});
