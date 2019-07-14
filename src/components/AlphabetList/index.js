import React from 'react';

import { AuthUserContext } from '../Session';
import Navigation from '../Navigation';
import AlphabetList from "./AlphabetList"

const AlphabetListPage = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <AlphabetListAuth authUser={authUser} /> : false
    }
  </AuthUserContext.Consumer>
);

const AlphabetListAuth = ({ authUser }) => {
  return (
    <div>
      <Navigation />
      <AlphabetList />
    </div>
  );
};

export default AlphabetListPage;
