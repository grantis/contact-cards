import React from 'react';
import { compose } from 'recompose';
import Navigation from '../Navigation';

import { withAuthorization, withEmailVerification } from '../Session';
import Contacts from '../Contacts';

const BrowsePage = () => (
  <div>
    <Navigation />
    <Contacts />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(BrowsePage);
