import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../styles/AlbumCard.module.css';

class AlbumCard extends React.Component {
  render() {
    const { name, url, artistName, collectionId } = this.props;
    return (
      <div className={ styles.container }>
        <img src={ url } alt={ name } />
        <h2>{ name }</h2>
        <p>{ artistName }</p>
        <Link
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className={ styles.link }
        >
          Musicas
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default AlbumCard;
