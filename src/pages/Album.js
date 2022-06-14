import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchGetMusics();
  }

  fetchGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      musics: response,
      loading: false,
    });
    // console.log(response);
  }

  renderAlbum = () => {
    const { musics } = this.state;
    const { artistName, collectionName } = musics[0];
    return (
      <div>
        <h2 data-testid="artist-name">{ artistName }</h2>
        <h3 data-testid="album-name">{ collectionName }</h3>
      </div>
    );
  };

  render() {
    const { loading, musics } = this.state;
    return (
      <div>
        <Header />
        { loading ? null : this.renderAlbum() }
        { musics.map((elem, index) => {
          if (index === 0) return null;
          return (<MusicCard music={ elem } key={ index } />);
        })}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
