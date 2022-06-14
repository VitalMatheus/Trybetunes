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
        <div key={ elem.collectionId } className="album-container">
          <Link
            key={ elem.collectionId }
            to={ `/album/${elem.collectionId}` }
            data-testid={ `link-to-album-${elem.collectionId}` }
          >
            <div className="album-infos">
              <img src={ elem.artworkUrl100 } alt={ elem.artistName } />
              <h3>{ elem.artistName }</h3>
              <p>{ elem.collectionName }</p>
            </div>
          </Link>
        </div>
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
              <form className="search-musics">
                <input
                  type="text"
                  id="input-music"
                  value={ value }
                  placeholder="Procurar"
                  onChange={ this.handleChange }
                  data-testid="search-artist-input"
                />
                <button
                  type="submit"
                  id="search-button"
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
                      <div className="albuns-collection">
                        {this.renderAlbum()}
                      </div>
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
