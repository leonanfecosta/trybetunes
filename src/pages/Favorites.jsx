import React from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import styles from '../styles/Favorites.module.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.updateFavorites();
  }

  updateFavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState(() => ({ loading: false, favorites }));
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <section data-testid="page-favorites" className={ styles.container }>
        {loading ? <h1 className={ styles.loading }>Carregando...</h1> : (
          favorites.map((music) => (
            <div key={ music.trackId }>
              <div>
                <img src={ music.artworkUrl100 } alt={ music.collectionName } />
              </div>
              <MusicCard
                name={ music.trackName }
                url={ music.previewUrl }
                music={ music }
                isFavorite
                updateFavorites={ this.updateFavorites }
              />

            </div>
          ))
        )}
      </section>
    );
  }
}

export default Favorites;
