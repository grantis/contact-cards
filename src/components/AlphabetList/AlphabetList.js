import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import _ from 'lodash';

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

class AlphabetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      contacts: [],
      limit: 5,
      names: [],
    };
  }
  componentDidMount = async () => {
    this.onListenForContacts();
  };

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

  render() {
    const { contacts, loading } = this.state;
    return (
      <div>
        {loading === true ? (
          <h1>hey, its loading</h1>
        ) : (
          <Count contacts={contacts} loading={loading} />
        )}
      </div>
    );
  }
}

const Count = ({ contacts, loading }) => {
  const content = contacts => {
    const names = contacts.map(contact => {
      return contact.name;
    });
    let letters = names.map(name => name[0]);
    const display = alphabet.map((currentLetter, index) => {
      let count = 0;
      letters.map(letter => {
        if (letter == currentLetter) count++;
      });
      return <li key={index}>{`${currentLetter}: ${count}`}</li>;
    });
    return display;
  };

  return <ul>{!loading ? content(contacts) : null}</ul>;
};


export default withFirebase(AlphabetList);
