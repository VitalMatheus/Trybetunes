import React from 'react';
import { getUser } from '../services/userAPI';
import { Link } from 'react-router-dom';

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
            <h2 data-testid="header-user-name">{ user }</h2>
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <br />
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            <br />
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            <br />
          </header>
        )
    );
  }
}

export default Header;
