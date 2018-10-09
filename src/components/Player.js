import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class Player extends Component {
  state = {
    user: 'jordan_young5',
    token: '',
    options: {
      device_id: ''
    },
    nowPlaying: { 
      name: 'Not Checked', 
      albumArt: '',
      isPlaying: false,
      isActive: false,
    }
  }

  componentDidMount() {
    this.setToken();
  }

  validate = () => {
    const { device_id } = this.state.options;
    const valid = device_id ? true : false;

    return valid;
  }

  setToken = () => {
    const token = this.props.getToken();
    spotifyApi.setAccessToken(token);
    return this.setState({token});
  }

  handlePlay = () => {
    const valid = this.validate();
    
    if (valid) {
      var nowPlaying = {...this.state.nowPlaying};
      spotifyApi.play(this.state.options);
      nowPlaying.isPlaying = true;
      return this.setState({nowPlaying});
    }
    
    console.log('There was an error');
  }
  
  handlePause = () => {
    const valid = this.validate();
    
    if (valid) {
      var nowPlaying = {...this.state.nowPlaying};
      nowPlaying.isPlaying = false;
      spotifyApi.pause(this.state.options);
      return this.setState({nowPlaying});
    }

    console.log('There was an error');
  }

  handleSkip = () => {
    const valid = this.validate();
    
    valid ? spotifyApi.skipToNext(this.state.options) : console.log('There was an error');
  }

  handlePrevious = () => {
    const valid = this.validate();
    
    valid ? spotifyApi.skipToPrevious(this.state.options) : console.log('There was an error');
  }
  
  handleSeekToStart = () => {
    const valid = this.validate();
    
    valid ? spotifyApi.seek(0, this.state.options) : console.log('There was an error');
  }

  getPlaybackState = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();
    
    if(!response) {
      console.log('There was an error getting playback');
      return;
    }

    this.setState({
      options: {device_id: response.device.id ? response.device.id : null},
      nowPlaying: { 
        name: response.item.name, 
        albumArt: response.item.album.images[0].url,
        isPlaying: response.is_playing,
        isActive: response.device.is_active
      }
    })  
  }

  render() {
    const { isActive, isPlaying } = this.state.nowPlaying;

    console.log(this.state)
    
    return (
      <Row>
        { isActive && (
          <Col xs="6">
            <Card>
              <CardBody>
                <CardTitle>
                  { 
                    isPlaying ? `Now Playing: ${this.state.nowPlaying.name}` : `Playback Paused`
                  }
                </CardTitle>  
                <img src={this.state.nowPlaying.albumArt} alt="album art" style={{ height: 150}} />
              </CardBody>
            </Card>
          </Col>
        )}
        <Col xs="6">
          <Card>
            <CardBody>
              <CardTitle>Player Management</CardTitle>
              <Button color="primary" className="m-1" onClick={this.getPlaybackState}>Get Playback</Button>
              <Button color="primary" className="m-1" onClick={this.handleSeekToStart}>Start Song Over</Button>
              <Button color="primary" className="m-1" onClick={this.handlePrevious}>Previous</Button>
              <Button color="primary" className="m-1" onClick={this.handlePlay}>Play</Button>
              <Button color="primary" className="m-1" onClick={this.handlePause}>Pause</Button>
              <Button color="primary" className="m-1" onClick={this.handleSkip}>Skip</Button>
            </CardBody>
          </Card>
        </Col>
        {/* <Card>
        <iframe
          title="player"
          src="https://open.spotify.com/embed/user/jordan_young5/playlist/7z07rKPVKxzKVLEX4iiAVl"
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
        </Card> */}
      </Row>
    )
  }
}

export default Player;
