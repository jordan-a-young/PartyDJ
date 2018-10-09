import React, { Component, Fragment } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Button, Card, CardTitle, CardText, CardBody, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

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
    playlists: [],
    tracks: [],
    selected_playlist: '',
    track: ["spotify:track:4uQ7wYsuL0DryknoDc11Hk"]
  }

  componentDidMount() {
    this.handleGetUserPlaylists()
  }

  handleGetMe = async () => {
    const response = await spotifyApi.getMe();
    console.log(response);
  }
  
  handleGetUser = () => {
    spotifyApi.getUser(this.state.user_id);
  }

  handleGetUserPlaylists = async () => {
    const response = await spotifyApi.getUserPlaylists();
    this.setState({playlists: response.items});
  }

  handleCreatePlaylist = () => {
    spotifyApi.createPlaylist(this.state.user_id, this.state.options);
  }

  handleGetPlaylistTracks = async playlist => {
    const { user_id } = this.state;
    var tracks = [];
    const size = playlist.tracks.total;
    var remaining = size;
    const limit = 100;
    var offset = 0;

    var options = {
      limit,
      offset
    }
    
    while (remaining > 0) {
      const response = await spotifyApi.getPlaylistTracks(user_id, playlist.id, options);
      tracks = tracks.concat(response.items);
      offset += limit;
      remaining -= limit;
      options.offset = offset;
    }

    this.setState({ tracks });
  }
  
  handleAddTrack = async () => {
    const { user_id, selected_playlist, track } = this.state;
    await spotifyApi.addTracksToPlaylist(user_id, selected_playlist, track);
  }
  
  handleSelectPlaylist = selected_playlist => {
    this.handleGetPlaylistTracks(selected_playlist);
    this.setState({ selected_playlist});
  }

  render() {
    const { playlists, selected_playlist, tracks } = this.state;
    const { getToken } = this.props;
    spotifyApi.setAccessToken(getToken());

    return (
      <Fragment>
        <Row className="w-100">
          <Col xs="12">
            <Card>
              <CardBody>
                <CardTitle>Playlist Management</CardTitle>
                <Button color="primary" onClick={this.handleGetMe} className="m-2">Me</Button>
                <Button color="primary" onClick={this.handleCreatePlaylist} className="m-2">Create Playlist</Button>
                <Button color="primary" onClick={this.handleGetUserPlaylists} className="m-2">Get User Playlists</Button>
                <Button color="primary" onClick={this.handleGetPlaylistTracks} className="m-2">Get Tracks</Button>
                {/* <Button color="primary" onClick={this.handleAddTrack} className="m-2">Add Track</Button> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="w-100">
          <Col xs="6">
            <Card>
              <CardBody>
                <CardTitle>User Playlists</CardTitle>
                <ListGroup>
                  {
                    playlists.map((playlist, id) => {
                      return <ListGroupItem key={id} tag="button" action onClick={() => this.handleSelectPlaylist(playlist)}>{playlist.name}</ListGroupItem>
                    })
                  }
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card>
              <CardBody>
                <CardTitle>{selected_playlist ? selected_playlist.name : 'Select a playlist'}</CardTitle>
                <CardText>Playlist Size: {selected_playlist ? selected_playlist.tracks.total : 0}</CardText>
                <ListGroup>
                  {
                    tracks.map((track, id) => {
                      return <ListGroupItem key={id}>{track.track.name}</ListGroupItem>
                    })
                  }
                </ListGroup>            
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default Playlist;
