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
        {/* <input
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={this.onChangeName}
                /> */}
        <TextField
          fullWidth={true}
          type="text"
          label="Job Title"
          value={jobTitle}
          onChange={onChangeJobTitle}
          margin="normal"
        />
        {/* <input
                  type="text"
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={this.onChangeJobTitle}
                /> */}

        <TextField
          fullWidth={true}
          type="text"
          label="Company"
          value={company}
          onChange={onChangeCompany}
          margin="normal"
        />
        {/* <input
                  type="text"
                  placeholder="company"
                  value={company}
                  onChange={this.onChangeCompany}
                /> */}
        <TextField
          fullWidth={true}
          type="text"
          label="Email"
          value={email}
          onChange={onChangeEmail}
          margin="normal"
        />
        {/* <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={this.onChangeEmail}
                /> */}
        <TextField
          fullWidth={true}
          type="text"
          label="Phone Number"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          margin="normal"
        />
        {/* <input
                  type="text"
                  placeholder="phoneNumber"
                  value={phoneNumber}
                  onChange={this.onChangePhoneNumber}
                /> */}
        <TextField
          fullWidth={true}
          type="text"
          label="URL"
          value={url}
          onChange={onChangeUrl}
          margin="normal"
        />
        {/* <input
                  type="text"
                  placeholder="url"
                  value={url}
                  onChange={this.onChangeUrl}
                /> */}
        <Button color="primary" type="submit">
          Send
        </Button>
      </form>
    );
  }
}

export default ContactForm;
