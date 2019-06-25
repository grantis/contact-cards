import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

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

const NavigationAuth = ({ authUser }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Create Contact Card</Link>
        </li>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  );
};

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING} />
    </li>
  </ul>
);

export default Navigation;
