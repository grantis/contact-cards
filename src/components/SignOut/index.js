import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { withFirebase } from '../Firebase';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    right: '20px',
  },
});

const SignOutButton = ({ firebase }) => {
  const classes = useStyles();

  return (
    <Button
      classes={{
        root: classes.root,
      }}
      variant="contained"
      color="secondary"
      type="button"
      onClick={firebase.doSignOut}
      className="sign-out-btn"
    >
      Sign Out
    </Button>
  );
};

export default withFirebase(SignOutButton);
