import React from 'react';
import Navigation from '../Navigation';
import ContactForm from '../Contacts/ContactForm';

const CreateContactPage = ({ authUser }) => {
  return (
    <div>
      <Navigation />
      <ContactForm />
    </div>
  );
};

export default CreateContactPage;
