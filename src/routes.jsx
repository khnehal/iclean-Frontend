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
import Promotions from './components/Promotions/index.jsx';

// Login Page
import Login from './components/Login/index.jsx';
// Route Container
import RouteContainer from './components/RouteContainer/index.jsx';


const RedirectToDashboard = () => <Redirect to={'/homepage/'} />;

const AppRoutes = () => (
    <Switch>
      <App>
        <Switch>
          <Route exact path={'/login/'} component={Login} />

          <RouteContainer path={'/homepage/'} componentToUse={App} />

          <RouteContainer path={'/orders/waitingOrders/'} componentToUse={Orders} />
          <RouteContainer path={'/orders/cleaning/'} componentToUse={CleaningOrders} />
          <RouteContainer path={'/orders/all/'} componentToUse={AllOrders} />

          <RouteContainer path={'/drivers/'} componentToUse={Drivers} />
          <RouteContainer path={'/drivers/areas/'} componentToUse={Areas} />
          <RouteContainer path={'/drivers/addDrivers/'} componentToUse={AddDrivers} />
          <RouteContainer path={'/drivers/addDayOff/'} componentToUse={AddDayOff} />

          <RouteContainer path={'/items/price-list/'} componentToUse={Items} />
          <RouteContainer path={'/items/add-item/'} componentToUse={AddItem} />

          <RouteContainer path={'/promotions/'} componentToUse={Promotions} />

          <RouteContainer path={'/*'} componentToUse={RedirectToDashboard} />
        </Switch>
      </App>
    </Switch>
);

export default AppRoutes;
