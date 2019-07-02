import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      jobTitle: '',
      company: '',
      phoneNumber: '',
      email: '',
      url: '',
    };
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
      company: this.state.company,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      url: this.state.url,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ name: '' });
    this.setState({ jobTitle: '' });
    this.setState({ company: '' });
    this.setState({ phoneNumber: '' });
    this.setState({ email: '' });
    this.setState({ url: '' });

    event.preventDefault();
  };
  render() {

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Container maxWidth="sm">
            <form
              onSubmit={event =>
                this.onCreateContact(event, authUser)
              }
            >
              <TextField
                fullWidth={true}
                type="text"
                label="Name"
                value={this.state.name}
                onChange={this.onChangeName}
                margin="normal"
              />
              <TextField
                fullWidth={true}
                type="text"
                label="Job Title"
                value={this.state.jobTitle}
                onChange={this.onChangeJobTitle}
                margin="normal"
              />
              <TextField
                fullWidth={true}
                type="text"
                label="Company"
                value={this.state.company}
                onChange={this.onChangeCompany}
                margin="normal"
              />
              <TextField
                fullWidth={true}
                type="text"
                label="Email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                margin="normal"
              />
              <TextField
                fullWidth={true}
                type="text"
                label="Phone Number"
                value={this.state.phoneNumber}
                onChange={this.onChangePhoneNumber}
                margin="normal"
              />
              <TextField
                fullWidth={true}
                type="text"
                label="URL"
                value={this.state.url}
                onChange={this.onChangeUrl}
                margin="normal"
              />
              <Button color="primary" type="submit">
                CREATE
              </Button>
            </form>
          </Container>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(ContactForm);
