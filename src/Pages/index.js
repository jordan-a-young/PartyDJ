import React, { Component, Fragment } from 'react';
import Login from './Login';
import { Container, Card } from 'reactstrap'
import Playlist from './Playlist';

class Pages extends Component {
  constructor(...args) {
    super(...args);
    this.pages = {
      Login: {page: Login},
      Playlist: {page: Playlist}
    }
    this.state = {
      loggedIn: false,
      userName: '',
      page: 'Login'
    }
  }
  

  changePage = (page, loggedIn) => {
    this.setState({ page: page || null, loggedIn: loggedIn || false})
  }

  render() {
    const { page, loggedIn } = this.state;
    const Page = this.pages[page] && this.pages[page].page;
    return (
      <Fragment>
        {/* <Container>
          <Card className="p-2 w-50">
            <Login />
          </Card>
          <Playlist />
        </Container> */}
        {Page && (
          <Page 
          state={this.state}  
          handleCreatePlaylist={this.handleCreatePlaylist}
          changePage={this.changePage}
          />
        )}
      </Fragment>
    );
  }
}

export default Pages;
