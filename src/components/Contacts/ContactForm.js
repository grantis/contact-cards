import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ContactForm extends Component {
  
  render() {
    const {
      authUser,
      name,
      jobTitle,
      company,
      phoneNumber,
      email,
      url,
      onCreateContact,
      onChangeName,
      onChangeJobTitle,
      onChangeCompany,
      onChangePhoneNumber,
      onChangeEmail,
      onChangeUrl,
    } = this.props;
    return (
      <form onSubmit={event => onCreateContact(event, authUser)}>
        <TextField
          fullWidth={true}
          type="text"
          label="Name"
          value={name}
          onChange={onChangeName}
          margin="normal"
        />
        <TextField
          fullWidth={true}
          type="text"
          label="Job Title"
          value={jobTitle}
          onChange={onChangeJobTitle}
          margin="normal"
        />
        <TextField
          fullWidth={true}
          type="text"
          label="Company"
          value={company}
          onChange={onChangeCompany}
          margin="normal"
        />
        <TextField
          fullWidth={true}
          type="text"
          label="Email"
          value={email}
          onChange={onChangeEmail}
          margin="normal"
        />
        <TextField
          fullWidth={true}
          type="text"
          label="Phone Number"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          margin="normal"
        />
        <TextField
          fullWidth={true}
          type="text"
          label="URL"
          value={url}
          onChange={onChangeUrl}
          margin="normal"
        />
        <Button color="primary" type="submit">
          Send
        </Button>
      </form>
    );
  }
}

export default ContactForm;
