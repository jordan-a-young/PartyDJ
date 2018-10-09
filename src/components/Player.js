import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class Player extends Component {
  state = {
    spotifyApi: null,
    user: 'jordan_young5',
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

  handlePlay = () => {
    spotifyApi.play(this.state.options);
    this.setState({isPlaying: true});
  }

  handlePause = () => {
    spotifyApi.pause(this.state.options);
    this.setState({isPlaying: false});
  }

  handleSkip = () => {
    spotifyApi.skipToNext(this.state.options);
  }

  handlePrevious = () => {
    spotifyApi.skipToPrevious(this.state.options);
  }

  handleSeekToStart = () => {
    spotifyApi.seek(0, this.state.options);
  }

  getPlaybackState = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();
    console.log(response)
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
    const { isActive } = this.state.nowPlaying;
    const { getToken } = this.props;
    spotifyApi.setAccessToken(getToken());
    
    return (
      <Row>
        { isActive && (
          <Col xs="6">
            <Card>
              <CardBody>
                <CardTitle>
                  Now Playing: {this.state.nowPlaying.name}
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
