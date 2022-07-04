import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../assets/images/logo.svg';
import styles from '../styles/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      userCreated: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  handleCreateUser = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ userCreated: true });
  }

  render() {
    const { name, loading, userCreated } = this.state;
    const MIN_USERNAME_LENGTH = 3;
    return (
      <div data-testid="page-login" className={ styles.container }>
        {userCreated && <Redirect to="/search" />}
        {loading ? <Loading /> : (
          <>
            <img src={ logo } alt="Logo TrybeTunes" />
            <form>
              <input
                type="text"
                placeholder="Username"
                value={ name }
                onChange={ this.handleSubmit }
                data-testid="login-name-input"
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ name.length < MIN_USERNAME_LENGTH }
                onClick={ this.handleCreateUser }
              >
                Entrar
              </button>
            </form>

          </>)}
      </div>
    );
  }
}

export default Login;
