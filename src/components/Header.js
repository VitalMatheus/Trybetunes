import React from 'react';
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
            <h2 data-testid="header-user-name">{ user }</h2>
          </header>
        )
    );
  }
}

export default Header;
