import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route path={ROUTES.HOME} component={HomePage} />
      {/* <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} /> */}
      {/* <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      /> */}
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
    </div>
  </Router>
);

export default withAuthentication(App);
