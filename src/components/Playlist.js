import React, { Component, Fragment } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Button, Card, CardTitle, CardBody} from 'reactstrap';


const spotifyApi = new SpotifyWebApi();

class Playlist extends Component {
  state = {
    data: null,
    user_id: "jordan_young5",
    options: {
      name: "Party DJ",
      description: "this is a playlist for use with the Party DJ web app",
      public: false,
      collaborative: true
    },
    items: [],
    playlist_id: "7z07rKPVKxzKVLEX4iiAVl",
    track: ["spotify:track:4uQ7wYsuL0DryknoDc11Hk"]
  }
  
  handleGetUser = () => {
    spotifyApi.getUser(this.state.user_id)
  }

  handleGetUserPlaylists = () => {
    spotifyApi.getUserPlaylists(this.state.user_id)
      .then((data) => {
        this.setState({ data, items: data.items })
      })
  }

  handleCreatePlaylist = () => {
    spotifyApi.createPlaylist(this.state.user_id, this.state.options)
  }

  handleGetTracks = () => {
    spotifyApi.getPlaylistTracks(this.state.user_id, this.state.playlist_id)
      .then(data =>
        console.log(data)
      )
  }

  handleAddTrack = () => {
    spotifyApi.addTracksToPlaylist(this.state.user_id, this.state.playlist_id, this.state.track)
      .then(data => console.log(data))
  }
  
  render() {
    console.log("Playlist", this.state)
    return (
      <Fragment>
        <Card>
          <CardBody>
            <CardTitle>Playlist Management</CardTitle>
            <Button color="primary" onClick={this.handleCreatePlaylist} className="m-2">Create Playlist</Button>
            <Button color="primary" onClick={this.handleGetUserPlaylists} className="m-2">Get User Playlists</Button>
            <Button color="primary" onClick={this.handleGetTracks} className="m-2">Get Tracks</Button>
            <Button color="primary" onClick={this.handleAddTrack} className="m-2">Add Track</Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>User Playlists</CardTitle>
            <ul>
              {
                this.state.items.map((item, id) => {
                  return <li key={id}>{item.name}</li>
                })
              }
            </ul>
          </CardBody>
        </Card>
      </Fragment>
    )
  }
}

export default Playlist;
