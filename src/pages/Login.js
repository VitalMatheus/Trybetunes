import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      name: '',
      isLoading: false,
      redirect: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(e) {
    e.preventDefault();
    const { name } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
      redirect: true,
    });
  }

  onInputChange({ target }) {
    const min = 3;
    let result = true;
    if (target.value.length >= min) result = false;
    this.setState({
      name: target.value,
      disabled: result,
    });
  }

  render() {
    const { disabled, name, isLoading, redirect } = this.state;
    return (
      isLoading ? <h3>Carregando...</h3>
        : (
          <div className="general-login">
            <div className="page-login">
              <form className="login-form">
                <input
                  type="text"
                  name="name"
                  value={ name }
                  className="header-container"
                  placeholder="Insira seu Nome"
                  onChange={ this.onInputChange }
                  data-testid="login-name-input"
                />
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ disabled }
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
                { redirect ? <Redirect to="/search" /> : null }
              </form>
            </div>
          </div>
        )
    );
  }
}

export default Login;
