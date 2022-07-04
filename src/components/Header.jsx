import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from '../styles/Header.module.css';
import profile from '../assets/images/user.svg';
import logo from '../assets/images/logo-header.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <>
        <header data-testid="header-component" className={ styles.container }>
          <section className={ styles.section }>
            <img src={ logo } alt="Logo Trybetunes" className={ styles.logo } />
            <div>
              <img
                src={ profile || user.image }
                alt="Avatar"
                className={ styles.imgProfile }
              />
              {loading ? <Loading /> : (
                <h1 data-testid="header-user-name">{user.name}</h1>)}
            </div>
          </section>
        </header>
        <nav className={ styles.nav }>
          <Link to="/search" data-testid="link-to-search" className={ styles.link }>
            Buscar
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites" className={ styles.link }>
            Favoritos
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className={ styles.link }>
            Perfil
          </Link>
        </nav>

      </>
    );
  }
}

export default Header;
