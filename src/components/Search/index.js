import React, { Component } from 'react';
import {
  InstantSearch,
  SearchBox,
  Hits,
} from 'react-instantsearch-dom';
import { ContactCardContent } from '../Contacts/ContactItem';
import { withFirebase } from '../Firebase';
import './index.scss';

const Hit = ({ hit }) => {
  return <ContactCardContent contact={hit} />;
};

const Content = () => {
  return <Hits hitComponent={Hit} />;
};

class SearchBase extends Component {
  render() {
    return (
      <InstantSearch
        searchClient={this.props.firebase.algolia}
        indexName="contacts"
      >
        <SearchBox />

        <Content updateContact={this.updateContact} />
      </InstantSearch>
    );
  }
}

const Search = withFirebase(SearchBase);

export default Search;
