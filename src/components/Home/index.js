import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Contacts from '../Contacts';

const HomePage = () => (
  <div>
    <h1>Create a business card.</h1>
    <Contacts />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
