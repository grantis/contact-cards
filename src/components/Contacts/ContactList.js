import React from 'react';

import ContactItem from './ContactItem';

const ContactList = ({
  authUser,
  contacts,
  onEditContact,
  onRemoveContact,
}) => (
  <ul>
    {contacts.map(contact => (
      <ContactItem
        authUser={authUser}
        key={contact.uid}
        contact={contact}
        onEditContact={onEditContact}
        onRemoveContact={onRemoveContact}
      />
    ))}
  </ul>
);

export default ContactList;
