import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ContactList from './ContactList';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import './index.scss';

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      contacts: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForContacts();
  }

  onListenForContacts = () => {
    this.setState({ loading: true });
    this.props.firebase
      .contacts()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const contactObject = snapshot.val();

        if (contactObject) {
          const contactList = Object.keys(contactObject).map(key => ({
            ...contactObject[key],
            uid: key,
          }));

          this.setState({
            contacts: contactList,
            loading: false,
          });
        } else {
          this.setState({ contacts: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.contacts().off();
  }

  onEditContact = (
    contact,
    authUser,
    name,
    jobTitle,
    company,
    phoneNumber,
    email,
    url,
  ) => {
    const { uid, contactSnapshot } = contact;
    this.props.firebase.contact(uid).set({
      ...contactSnapshot,
      name: name,
      jobTitle: jobTitle,
      company: company,
      phoneNumber: phoneNumber,
      email: email,
      url: url,
      userId: authUser.uid,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveContact = uid => {
    this.props.firebase.contact(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForContacts,
    );
  };

  render() {
    const { contacts, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div style={{ marginTop: 50 }}>
            <Container>
              <div className="container">
                {contacts && (
                  <ContactList
                    authUser={authUser}
                    contacts={contacts}
                    onEditContact={this.onEditContact}
                    onRemoveContact={this.onRemoveContact}
                  />
                )}
              </div>
              {!loading && contacts && (
                <Button
                  size="small"
                  type="button"
                  onClick={this.onNextPage}
                >
                  More
                </Button>
              )}
              {!contacts && <div>There are no contacts ...</div>}
              {loading && <div>Loading ...</div>}
            </Container>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Contacts);
