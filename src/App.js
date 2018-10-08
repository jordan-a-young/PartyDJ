import React, { Component, Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import Header from './components/Header';
import Login from './components/Login';
import Player from './components/Player';
import Playlist from './components/Playlist';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Container>
          <Row>
            <Login />
          </Row>
          <Row>
            <Player />
          </Row>
          <Row>
            <Playlist />
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default App;
