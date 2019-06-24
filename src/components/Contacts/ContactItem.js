import React, { Component } from 'react';

class ContactItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.contact.name,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.contact.name,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditContact(this.props.contact, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, contact, onRemoveContact } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <p>{contact.name}</p>
            <p>{contact.company}</p>
            <p>{contact.email}</p>
            <p>{contact.phoneNumber}</p>
            {contact.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser.uid === contact.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveContact(contact.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default ContactItem;
