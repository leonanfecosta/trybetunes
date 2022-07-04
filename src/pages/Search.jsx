import React from 'react';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import styles from '../styles/Search.module.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      loading: false,
      albums: [],
      artistName: '',
      hasArtist: false,
    };
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSearch = async () => {
    const { search } = this.state;
    this.setState({ loading: true, artistName: search, hasArtist: true });
    const albums = await searchAlbumsAPI(search);
    this.setState({ search: '', albums, loading: false });
  };

  render() {
    const { search, loading, albums, artistName, hasArtist } = this.state;
    const MIN_SEARCH_LENGTH = 2;
    return (
      <section data-testid="page-search" className={ styles.container }>
        <input
          type="text"
          placeholder="Nome do Artista"
          value={ search }
          onChange={ this.handleChange }
          data-testid="search-artist-input"
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ search.length < MIN_SEARCH_LENGTH }
          onClick={ this.handleSearch }
        >
          Pesquisar
        </button>
        <form className={ styles.form }>
          {loading ? (
            <h1 className={ styles.loading }>Carregando...</h1>
          ) : (
            <>
              {albums.length > 0 && (
                <p
                  className={ styles.searchText }
                >
                  {`Resultado de álbuns de: ${artistName}`}

                </p>
              )}
              {hasArtist && albums.length === 0 && (
                <p className={ styles.notFound }>Nenhum álbum foi encontrado</p>
              )}
              {albums.length > 0 && (
                <section className={ styles.album }>
                  {albums.map((album) => (
                    <AlbumCard
                      key={ album.collectionId }
                      name={ album.collectionName }
                      url={ album.artworkUrl100 }
                      artistName={ album.artistName }
                      tracks={ album.trackCount }
                      collectionId={ album.collectionId }
                    />
                  ))}
                </section>
              )}
            </>
          )}
        </form>
      </section>
    );
  }
}

export default Search;
