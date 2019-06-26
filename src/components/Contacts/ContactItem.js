import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const EditCardOptions = props => {
  const {
    editName,
    editJobTitle,
    editCompany,
    editPhoneNumber,
    editEmail,
    editUrl,
    onChangeEditName,
    onChangeEditJobTitle,
    onChangeEditCompany,
    onChangeEditPhoneNumber,
    onChangeEditEmail,
    onChangeEditUrl,
  } = props;
  return (
    <CardContent>
      <input
        type="text"
        value={editName}
        onChange={onChangeEditName}
      />
      <input
        type="text"
        value={editJobTitle}
        onChange={onChangeEditJobTitle}
      />
      <input
        type="text"
        value={editCompany}
        onChange={onChangeEditCompany}
      />
      <input
        type="text"
        value={editPhoneNumber}
        onChange={onChangeEditPhoneNumber}
      />
      <input
        type="text"
        value={editEmail}
        onChange={onChangeEditEmail}
      />
      <input type="text" value={editUrl} onChange={onChangeEditUrl} />
    </CardContent>
  );
};

const ContactCardContent = props => {
  const { contact } = props;
  return (
    <CardContent>
      <Typography variant="h2" component="h2">
        <p>{contact.name}</p>
      </Typography>
      <Typography variant="h3" component="h2">
        <p>{contact.jobTitle}</p>
      </Typography>
      <Typography variant="h5" component="h2">
        <p>{contact.company}</p>
      </Typography>
      <Typography variant="h5" component="h2">
        <p>{contact.phoneNumber}</p>
      </Typography>
      <Typography variant="h5" component="h2">
        <p>{contact.email}</p>
      </Typography>
      <Typography variant="h5" component="h2">
        <p>{contact.url}</p>
      </Typography>
    </CardContent>
  );
};
class ContactItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editName: this.props.contact.name,
      editJobTitle: this.props.contact.jobTitle,
      editCompany: this.props.contact.company,
      editPhoneNumber: this.props.contact.phoneNumber,
      editEmail: this.props.contact.email,
      editUrl: this.props.contact.url,
    };
  }

  onToggleEditMode = async () => {
    await this.setState(state => ({
      editMode: !state.editMode,
      editName: this.props.contact.name,
    }));
  };

  onChangeEditName = event => {
    this.setState({ editName: event.target.value });
  };
  onChangeEditJobTitle = event => {
    this.setState({ editJobTitle: event.target.value });
  };
  onChangeEditCompany = event => {
    this.setState({ editCompany: event.target.value });
  };
  onChangeEditPhoneNumber = event => {
    this.setState({ editPhoneNumber: event.target.value });
  };
  onChangeEditEmail = event => {
    this.setState({ editEmail: event.target.value });
  };
  onChangeEditUrl = event => {
    this.setState({ editUrl: event.target.value });
  };

  onSaveEditContact = async () => {
    const {
      editName,
      editJobTitle,
      editCompany,
      editPhoneNumber,
      editEmail,
      editUrl,
    } = this.state;
    this.props.onEditContact(
      this.props.contact,
      this.props.authUser,
      editName,
      editJobTitle,
      editCompany,
      editPhoneNumber,
      editEmail,
      editUrl,
    );

    await this.setState({ editMode: false });
  };

  render() {
    const { authUser, contact, onRemoveContact } = this.props;
    const {
      editMode,
      editName,
      editJobTitle,
      editCompany,
      editPhoneNumber,
      editEmail,
      editUrl,
    } = this.state;

    return (
      <Card>
        {editMode ? (
          <EditCardOptions
            editName={editName}
            editJobTitle={editJobTitle}
            editCompany={editCompany}
            editPhoneNumber={editPhoneNumber}
            editEmail={editEmail}
            editUrl={editUrl}
            onChangeEditName={this.onChangeEditName}
            onChangeEditJobTitle={this.onChangeEditJobTitle}
            onChangeEditCompany={this.onChangeEditCompany}
            onChangeEditPhoneNumber={this.onChangeEditPhoneNumber}
            onChangeEditEmail={this.onChangeEditEmail}
            onChangeEditUrl={this.onChangeEditUrl}
          />
        ) : (
          <ContactCardContent contact={contact} />
        )}

        {authUser.uid === contact.userId && (
          <span>
            {editMode ? (
              <span>
                <Button size="small" onClick={this.onSaveEditContact}>
                  Save
                </Button>
                <Button size="small" onClick={this.onToggleEditMode}>
                  Reset
                </Button>
              </span>
            ) : (
              <Button size="small" onClick={this.onToggleEditMode}>
                Edit
              </Button>
            )}

            {!editMode && (
              <Button
                size="small"
                onClick={() => onRemoveContact(contact.uid)}
              >
                Delete
              </Button>
            )}
          </span>
        )}
      </Card>
    );
  }
}

export default ContactItem;
