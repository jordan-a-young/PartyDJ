import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Button } from 'reactstrap';
const spotifyApi = new SpotifyWebApi();

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      authEndpoint: 'https://accounts.spotify.com/authorize',
      clientId: '86b3966826b949b984fae87920c8d591',
      redirectUri: 'http://localhost:3000/',
      scopes: ['user-top-read']
    }
  }

  componentDidMount() {
    const params = this.getHashParams();
    const token = params.access_token;
    const { spotifyApi } = this.props;

    if (token) {
      spotifyApi.setAccessToken(token);
      return this.setState({loggedIn: true});
    }
    
    const { authEndpoint, clientId, redirectUri, scopes } = this.state;
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
  }

  getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return <Button color="primary" className="btn btn-primary">Login to Spotify</Button>
  }
}

export default Login;
