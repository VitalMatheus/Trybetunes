import React from 'react';
import { GiHeadphones } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchGetUser();
  }

  async fetchGetUser() {
    this.setState({
      isLoading: true,
    });
    const response = await getUser();
    this.setState({
      user: response.name,
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      isLoading ? <h3>Carregando...</h3>
        : (
          <header data-testid="header-component">
            <div className="header-container">
              <h1>
                Trybe
                {' '}
                <GiHeadphones />
                {' '}
                Tunes
                {' '}
              </h1>
              <h2 data-testid="header-user-name">
                Usuário:
                {' '}
                { user }
              </h2>
            </div>
            <div className="nav-bar">
              <div className="header-buttons">
                <Link to="/search" data-testid="link-to-search">Search</Link>
              </div>
              <div className="header-buttons">
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              </div>
              <div className="header-buttons">
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              </div>
            </div>
          </header>
        )
    );
  }
}

export default Header;
