import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import Contacts from '../Contacts';
import Search from '../Search';

const HomePage = () => {
  return <div>Hello</div>;
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
