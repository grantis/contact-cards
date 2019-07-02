import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { MenuDrawer } from './MenuDrawer';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

class NavigationAuth extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <MenuDrawer />
            <SignOutButton />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING} />
    </li>
  </ul>
);

export default Navigation;
