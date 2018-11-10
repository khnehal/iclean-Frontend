import React from 'react';
import {
  // BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import App from './components/App/index.jsx';

import Orders from './components/Orders/index.jsx';
import CleaningOrders from './components/Orders/CleaningOrders.jsx';
import AllOrders from './components/Orders/AllOrders.jsx';
import Items from './components/Items/index.jsx';
import AddItem from './components/Items/AddItem.jsx';

const RedirectToDashboard = () => <Redirect to={'/homepage/'} />;

const AppRoutes = () => (
    <Switch>
      <App>
        <Switch>
          <Route exact path={'/homepage/'} component={App} />

          <Route exact path={'/orders/waitingOrders/'} component={Orders} />
          <Route exact path={'/orders/cleaning/'} component={CleaningOrders} />
          <Route exact path={'/orders/all/'} component={AllOrders} />

          <Route exact path={'/items/price-list/'} component={Items} />
          <Route exact path={'/items/add-item/'} component={AddItem} />

          <Route path={'/*'} component={RedirectToDashboard} />
        </Switch>
      </App>
    </Switch>
);

export default AppRoutes;
