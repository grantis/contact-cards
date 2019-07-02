import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from '../Landing';
import BrowsePage from '../Browse';
import AccountPage from '../Account';
import CreateContactPage from '../Create';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Route path={ROUTES.BROWSE} component={BrowsePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route
        exact
        path={ROUTES.CREATE}
        component={CreateContactPage}
      />
    </div>
  </Router>
);

export default withAuthentication(App);
