import React from 'react';
import PropTypes from 'prop-types';

import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleCheck = async ({ target }) => {
    // const { trackId } = this.props;
    this.setState({
      checked: target.checked,
      loading: true,
    });

    const obj = await getMusics(target.id);
    const addMusic = await addSong(obj);

    if (addMusic) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading, checked } = this.state;
    return (
      loading ? <h3>Carregando...</h3>
        : (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorites">
              Favorita
              <input
                type="checkbox"
                id="favorites"
                checked={ checked }
                onChange={ this.handleCheck }
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
