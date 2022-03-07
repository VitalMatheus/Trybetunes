import React from 'react';

import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const min = 2;
    let result = true;
    if (target.value.length >= min) result = false;
    this.setState({
      name: target.value,
      disabled: result,
    });
  }

  render() {
    const { name, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name={ name }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            disabled={ disabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
