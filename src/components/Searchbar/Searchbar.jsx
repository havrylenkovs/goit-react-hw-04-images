import { useState } from 'react';
import React from 'react';
// import { Component } from 'react';
import './Searchbar.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  // export class Searchbar extends Component {

  const [searchQuery, setSearchQuery] = useState('');
  // state = {
  //   searchQuery: '',
  // };

  const handleChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
    console.log(event.target.value);
  };
  // handleChange = event => {
  //     const { name, value } = event.currentTarget;
  //     this.setState({ [name]: value });
  //     this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  //   };
  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return alert('Please enter, what do you want to see');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };
  // handleSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.searchQuery.trim() === '') {
  //     return alert('Please enter, what do you want to see');
  //   }
  //   console.log(this.state.searchQuery);
  //   this.props.onSubmit(this.state.searchQuery);
  //   this.setState({ searchQuery: '' });
  // };

  // render() {
  return (
    <header className="SearchContainer">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button className="SearchForm-button" type="submit">
          <span></span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
// export default Searchbar;
