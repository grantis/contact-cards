import React from 'react';
import SignInPage from '../SignIn';
import './index.scss';
import Typography from '@material-ui/core/Typography';

import { AuthUserContext } from '../Session';
import Navigation from '../Navigation';
import Search from '../Search';

const LandingPage = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <LandingPageAuth authUser={authUser} />
      ) : (
        <LandingPageNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const LandingPageAuth = ({ authUser }) => {
  return (
    <div>
      <Navigation />
    </div>
  );
};

const LandingPageNonAuth = () => (
  <div className="landing-title">
    <Typography
      align="center"
      variant="h1"
      component="h2"
      gutterBottom
    >
      Contact Cards
    </Typography>
    <Typography
      align="center"
      variant="h6"
      component="h6"
      gutterBottom
    >
      A community for posting business and contact cards, all in one
      place.
    </Typography>
    <SignInPage />
  </div>
);

export default LandingPage;
