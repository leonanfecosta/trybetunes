import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import styles from '../styles/ProfileEdite.module.css';
import logo from '../assets/images/user.svg';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
      email: '',
      description: '',
      image: '',
      update: false,
      disabled: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    const { name, email, description, image } = user;
    this.setState({ loading: false, name, email, description, image });
    this.validateInput();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.validateInput();
  }

  handleSubmit = async () => {
    this.setState({ loading: true });
    const { name, email, description, image } = this.state;
    const user = { name, email, description, image };

    await updateUser(user);
    this.setState({ loading: false, update: true });
  }

  validateInput = () => {
    const { name, email, description, image } = this.state;
    // Validação de email , fonte: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const regex = /\S+@\S+\.\S+/;
    if (name && regex.test(email) && description && image) {
      return this.setState({ disabled: false });
    }
  }

  render() {
    const { loading, name, email, description, image, update, disabled } = this.state;
    return (
      <div data-testid="page-profile-edit" className={ styles.container }>
        {update && <Redirect to="/profile" />}
        {loading ? <h1 className={ styles.loading }>Carregando...</h1> : (
          <form>
            <div>
              <img src={ logo } alt={ name } data-testid="profile-image" />
              <input
                type="text"
                value={ image }
                data-testid="edit-input-image"
                name="image"
                onChange={ this.handleChange }
                placeholder="URL da imagem"
              />
            </div>
            <label htmlFor="name" className={ styles.label }>
              <h1>Nome</h1>
              <p>Fique a vontade para usar seu nome social</p>
              <input
                id="name"
                type="text"
                value={ name }
                data-testid="edit-input-name"
                name="name"
                onChange={ this.handleChange }
                placeholder="Nome"
              />
            </label>
            <label htmlFor="email" className={ styles.label }>
              <h1>E-mail</h1>
              <p>Escolha um email que consulte diariamente</p>
              <input
                id="email"
                type="text"
                value={ email }
                data-testid="edit-input-email"
                name="email"
                onChange={ this.handleChange }
                placeholder="usuario@usuario.com"
              />
            </label>

            <label htmlFor="description" className={ styles.label }>
              <h1>Descrição</h1>
              <p>Escreva um pouco sobre você</p>
              <textarea
                id="description"
                value={ description }
                data-testid="edit-input-description"
                name="description"
                onChange={ this.handleChange }
                placeholder="Sobre você"
              />
            </label>
            <button
              type="button"
              data-testid="edit-button"
              disabled={ disabled }
              onClick={ this.handleSubmit }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
