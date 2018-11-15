import React from 'react';
import {
  // BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

// Homepage App
import App from './components/App/index.jsx';

// Orders Landing Page and Sub Page
import Orders from './components/Orders/index.jsx';
import CleaningOrders from './components/Orders/CleaningOrders.jsx';
import AllOrders from './components/Orders/AllOrders.jsx';

// Drivers Landing Page and Sub Page
import Drivers from './components/Drivers/index.jsx';
import Areas from './components/Drivers/Areas.jsx';
import AddDrivers from './components/Drivers/AddDrivers.jsx';
import AddDayOff from './components/Drivers/AddDayOff.jsx';

// Items Landing Page and Sub Page
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

          <Route exact path={'/drivers/'} component={Drivers} />
          <Route exact path={'/drivers/areas/'} component={Areas} />
          <Route exact path={'/drivers/addDrivers/'} component={AddDrivers} />
          <Route exact path={'/drivers/addDayOff/'} component={AddDayOff} />

          <Route exact path={'/items/price-list/'} component={Items} />
          <Route exact path={'/items/add-item/'} component={AddItem} />

          <Route path={'/*'} component={RedirectToDashboard} />
        </Switch>
      </App>
    </Switch>
);

export default AppRoutes;
