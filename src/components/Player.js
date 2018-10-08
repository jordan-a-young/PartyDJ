import React, { Component, Fragment } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import SpotifyWebApi from 'spotify-web-api-js';


const spotifyApi = new SpotifyWebApi();

class Player extends Component {
  state = {
    user: 'jordan_young5',
    options: {
      device_id: ''
    },
    nowPlaying: { 
      name: 'Not Checked', 
      albumArt: '',
      isPlaying: false 
    }
  }

  componentDidMount() {
    this.getPlaybackState()
  }

  handlePlay = () => {
    spotifyApi.play(this.state.options)
    this.setState({isPlaying: true})
  }

  handlePause = () => {
    spotifyApi.pause(this.state.options)
    this.setState({isPlaying: false})
  }

  handleSkip = () => {
    spotifyApi.skipToNext(this.state.options)
  }

  handlePrevious = () => {
    spotifyApi.skipToPrevious(this.state.options)
  }

  handleSeekToStart = () => {
    spotifyApi.seek(0, this.state.options)
  }

  getPlaybackState = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then((data) => {
        console.log(data)
        this.setState({
          options: {device_id: data.device.id},
          nowPlaying: { 
            name: data.item.name, 
            albumArt: data.item.album.images[0].url,
            isPlaying: data.is_playing
          }
        })
      })
  }

  render() {
    // console.log(this.state)
    const { isPlaying } = this.state.nowPlaying
    return (
      <Fragment>
        { isPlaying && (
          <Card className="p-2">
            <CardTitle>
              Now Playing: {this.state.nowPlaying.name}
            </CardTitle>  
            <CardBody>
              <img src={this.state.nowPlaying.albumArt} alt="album art" style={{ height: 150}} />
            </CardBody>
          </Card>
        )}
        <Card className="p-2">
          <CardTitle>Player Management</CardTitle>
          <CardBody>
            <Button color="primary" className="m-1" onClick={this.getPlaybackState}>Get Playback</Button>
            <Button color="primary" className="m-1" onClick={this.handleSeekToStart}>Start Song Over</Button>
            <Button color="primary" className="m-1" onClick={this.handlePrevious}>Previous</Button>
            <Button color="primary" className="m-1" onClick={this.handlePlay}>Play</Button>
            <Button color="primary" className="m-1" onClick={this.handlePause}>Pause</Button>
            <Button color="primary" className="m-1" onClick={this.handleSkip}>Skip</Button>
          </CardBody>
        </Card>
        <Card>
        <iframe
          title="player"
          src="https://open.spotify.com/embed/user/jordan_young5/playlist/7z07rKPVKxzKVLEX4iiAVl"
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
        </Card>
      </Fragment>
    )
  }
}

export default Player;
