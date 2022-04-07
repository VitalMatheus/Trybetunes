import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    this.setState({
      loading: true,
      checked: target.checked,
    });

    const obj = await getMusics(target.id);
    this.checked = target.checked
      ? await removeSong(obj[0])
      : await addSong(obj[0]);
    const xablau = await getFavoriteSongs();
    console.log(xablau);

    if (xablau) {
      this.setState({
        loading: false,
      });
    }
  }

  componentDidMount = async () => {
    const { music: { trackId } } = this.props;
    const xablau = await getFavoriteSongs();
    const trackIDS = xablau.map((id) => id.trackId);

    this.setState({
      checked: trackIDS.some((song) => song === trackId),
    });
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
                id={ trackId }
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
