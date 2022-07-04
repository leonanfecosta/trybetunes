import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import styles from '../styles/MusicCard.module.css';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    const { isFavorite } = props;
    this.state = {
      favorite: isFavorite,
      loading: false,
    };
  }

  handleFavorite = async ({ target: { checked } }) => {
    const { music, updateFavorites } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ favorite: checked, loading: false });
    updateFavorites();
  }

  render() {
    const { name, url, music: { trackId } } = this.props;
    const { favorite, loading } = this.state;
    return (
      <section className={ styles.container }>
        {loading ? <h1 className={ styles.loading }>Carregando...</h1> : (
          <div>
            <h2 data-testid="music-name">{name}</h2>
            <audio data-testid="audio-component" src={ url } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor={ name }>
              <input
                type="checkbox"
                id={ name }
                checked={ favorite }
                onChange={ this.handleFavorite }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favoritar
            </label>
          </div>
        )}

      </section>
    );
  }
}

MusicCard.defaultProps = {
  updateFavorites: () => {},
};

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  updateFavorites: PropTypes.func,
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
