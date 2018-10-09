import React, { Component, Fragment } from 'react';
import { Button, Container } from 'reactstrap';
import Header from './components/Header';
import Login from './components/Login';
import Player from './components/Player';
import Playlist from './components/Playlist';

const login = new Login();

class App extends Component {
  state = {
    token: '',
    loggedIn: false,
  }

  componentDidMount() {
    console.log('App mounted with State: ', this.state);
  }

  handleLogin = () => {
    return this.setState(prevState => 
      ({ loggedIn: !prevState.loggedIn })
    )
  }

  getToken = () => { 
    return login.getToken();
  }

  render() {
    const { loggedIn } = this.state;

    if (loggedIn) this.getToken()

    return (
      <Fragment>
        <Header />
        <Container>
          <Button color="primary" onClick={this.handleLogin}>{loggedIn ? 'Logout' : 'Login'}</Button>
          {
            loggedIn && (
              <Fragment>
                <Player />
                <Playlist />
              </Fragment>
            )
          }
        </Container>
      </Fragment>
    );
  }
}

export default App;
