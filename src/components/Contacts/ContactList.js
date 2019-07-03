import React from 'react';

import ContactItem from './ContactItem';

const ContactList = ({
  authUser,
  contacts,
  onEditContact,
  onRemoveContact,
}) => (
  <>
    {contacts.map(contact => (
      <ContactItem
        authUser={authUser}
        key={contact.uid}
        contact={contact}
        onEditContact={onEditContact}
        onRemoveContact={onRemoveContact}
      />
    ))}
  </>
);

export default ContactList;
