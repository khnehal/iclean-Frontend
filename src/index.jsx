import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import AppRoutes from './routes';
import configureStore from './store/configure';
import * as serviceWorker from './serviceWorker';
import NavBar from './components/NavBar/NavBar.jsx';

const history = createBrowserHistory();

require('./index.css');

const store = configureStore({}, history);

const renderApp = () => (
  <Provider store={store} key={Math.random()}>
    <ConnectedRouter history={history} key={Math.random()}>
      <div>
        <NavBar />
        <div className="container iCleanContainer">
          <AppRoutes />
        </div>
      </div>
    </ConnectedRouter>
  </Provider>
);

const root = document.getElementById('root');

render(renderApp(), root);

serviceWorker.register();
