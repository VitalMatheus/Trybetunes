import React from 'react';
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
              <p>TrybeTunes </p>
              <h2 data-testid="header-user-name">{ user }</h2>
            </div>
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
