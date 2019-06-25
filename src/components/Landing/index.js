import React from 'react';
import SignInPage from '../SignIn';
import './index.scss';
import Typography from '@material-ui/core/Typography';

const Landing = () => (
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

export default Landing;
