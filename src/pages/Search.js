import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      value: '',
      disabled: true,
      isLoading: false,
      fetched: false,
      artist: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchSearchAlbumAPI = this.fetchSearchAlbumAPI.bind(this);
    this.renderAlbum = this.renderAlbum.bind(this);
  }

  handleChange({ target }) {
    const min = 2;
    let result = true;
    if (target.value.length >= min) result = false;
    this.setState({
      value: target.value,
      disabled: result,
    });
  }

  async handleClick(e) {
    e.preventDefault();

    await this.fetchSearchAlbumAPI();

    this.setState({
      fetched: true,
    });
  }

  async fetchSearchAlbumAPI() {
    const { value } = this.state;
    this.setState({
      isLoading: true,
      name: value,
      value: '',
    });

    const response = await searchAlbumsAPI(value);
    console.log(response);

    this.setState({
      artist: response,
    }, () => this.setState({
      isLoading: false,
    }));
  }

  renderAlbum() {
    const { artist } = this.state;

    if (artist.length < 1) {
      return <h4>Nenhum álbum foi encontrado</h4>;
    }
    return (
      artist.map((elem) => (
        <Link
          key={ elem.collectionId }
          to={ `/album/${elem.collectionId}` }
          data-testid={ `link-to-album-${elem.collectionId}` }
        >
          <img src={ elem.artworkUrl100 } alt={ elem.artistName } />
          { elem.artistName }
          { elem.collectionName }
        </Link>
      ))
    );
  }

  render() {
    const { name, value, disabled, isLoading, fetched } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading ? <h2>Carregando...</h2>
          : (
            <div>
              <form>
                <input
                  type="text"
                  value={ value }
                  placeholder="Procurar"
                  onChange={ this.handleChange }
                  data-testid="search-artist-input"
                />
                <button
                  type="submit"
                  disabled={ disabled }
                  onClick={ this.handleClick }
                  data-testid="search-artist-button"
                >
                  Pesquisar
                </button>
              </form>

              <div>
                { fetched
                  ? (
                    <div>
                      <h2>
                        Resultado de álbuns de:
                        {' '}
                        { name }
                      </h2>
                      {this.renderAlbum()}
                    </div>
                  )
                  : null }
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Search;
