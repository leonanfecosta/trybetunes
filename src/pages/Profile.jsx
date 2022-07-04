import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import styles from '../styles/Profile.module.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState(
      {
        loading: false,
        name: user.name,
        email: user.email,
        description: user.description,
        image: user.image,
      },
    );
  }

  render() {
    const { loading, email, image, name, description } = this.state;
    return (
      <section data-testid="page-profile">
        {loading ? <h1 className={ styles.loading }>Carregando...</h1> : (
          <section className={ styles.container }>
            <div>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <Link to="/profile/edit" className={ styles.link }>Editar perfil</Link>
            </div>
            <label htmlFor="name">
              <h2>Nome</h2>
              <span id="name">{name}</span>
            </label>
            <label htmlFor="email">
              <h2>Email</h2>
              <span id="email">{email}</span>
            </label>
            <label htmlFor="description">
              <h2>Descrição</h2>
              <span id="description">{description}</span>
            </label>
          </section>
        )}
      </section>
    );
  }
}

export default Profile;
