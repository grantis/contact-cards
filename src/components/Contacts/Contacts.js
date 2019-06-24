import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ContactList from './ContactList';

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      jobTitle: '',
      url: '',
      company: '',
      email: '',
      phoneNumber: '',
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

  onChangeName = event => {
    this.setState({ name: event.target.value });
  };

  onChangeCompany = event => {
    this.setState({ company: event.target.value });
  };

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangePhoneNumber = event => {
    this.setState({ phoneNumber: event.target.value });
  };

  onChangeJobTitle = event => {
    this.setState({ jobTitle: event.target.value });
  };

  onChangeUrl = event => {
    this.setState({ url: event.target.value });
  };

  onCreateContact = (event, authUser) => {
    this.props.firebase.contacts().push({
      name: this.state.name,
      jobTitle: this.state.jobTitle,
      url: this.state.url,
      company: this.state.company,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ name: '' });
    this.setState({ company: '' });
    this.setState({ email: '' });
    this.setState({ phoneNumber: '' });
    this.setState({ jobTitle: '' });
    this.setState({ url: '' });

    event.preventDefault();
  };

  onEditContact = (
    contact,
    name,
    email,
    phoneNumber,
    url,
    jobTitle,
    company,
  ) => {
    const { uid, ...contactSnapshot } = contact;

    this.props.firebase.contact(contact.uid).set({
      ...contactSnapshot,
      name,
      jobTitle,
      url,
      company,
      email,
      phoneNumber,
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
    const {
      name,
      jobTitle,
      url,
      company,
      email,
      phoneNumber,
      contacts,
      loading,
    } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && contacts && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {contacts && (
              <ContactList
                authUser={authUser}
                contacts={contacts}
                onEditContact={this.onEditContact}
                onRemoveContact={this.onRemoveContact}
              />
            )}

            {!contacts && <div>There are no contacts ...</div>}

            <form
              onSubmit={event =>
                this.onCreateContact(event, authUser)
              }
            >
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={this.onChangeName}
              />
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={this.onChangeJobTitle}
              />
              <input
                type="text"
                placeholder="url"
                value={url}
                onChange={this.onChangeUrl}
              />
              <input
                type="text"
                placeholder="company"
                value={company}
                onChange={this.onChangeCompany}
              />
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={this.onChangeEmail}
              />
              <input
                type="text"
                placeholder="phoneNumber"
                value={phoneNumber}
                onChange={this.onChangePhoneNumber}
              />

              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Contacts);
