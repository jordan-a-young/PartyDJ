import React, { Component, Fragment } from 'react';
import {
	Button, Card, CardBody, CardTitle, Col, Row,
} from 'reactstrap';
import SpotifyWebApi from 'spotify-web-api-js';
import PropTypes from 'prop-types';

const spotifyApi = new SpotifyWebApi();

class Player extends Component {
	state = {
		options: {
			deviceId: '',
		},
		nowPlaying: {
			name: 'Not Checked',
			albumArt: '',
			isPlaying: false,
			isActive: false,
			volume: 0,
		},
		deviceList: [],
	}

	componentDidMount() {
		this.setToken();
		this.handleGetPlaybackState();
	}

	validate = () => {
		const { options } = this.state;
		return options.deviceId !== '';
	}

	setToken = () => {
		const { getToken } = this.props;
		const token = getToken();
		spotifyApi.setAccessToken(token);
	}

	handlePlay = () => {
		const valid = this.validate();
		const { options } = this.state;

		if (valid) {
			const { nowPlaying } = this.state;
			spotifyApi.play(options);
			nowPlaying.isPlaying = true;
			return this.setState({ nowPlaying });
		}
		return console.log('There was an error');
	}

	handlePause = () => {
		const valid = this.validate();
		const { options } = this.state;

		if (valid) {
			const { nowPlaying } = this.state;
			nowPlaying.isPlaying = false;
			spotifyApi.pause(options);
			return this.setState({ nowPlaying });
		}

		return console.log('There was an error');
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

	handleGetDevices = async () => {
		const response = await spotifyApi.getMyDevices();

		if (!response) {
			console.log('There was an error getting devices')
			return;
		}

		console.log(response)
		this.setState({ deviceList: response.devices })
	}

	handleSetVolume = volumeChange => {
		const { nowPlaying, options } = this.state;
		let newVolume = nowPlaying.volume + volumeChange;

		if (nowPlaying.volume+volumeChange < 0) {
			newVolume = 0;
		} else if (nowPlaying.volume+volumeChange > 100) {
			newVolume = 100;
		}

		spotifyApi.setVolume(newVolume, options);
		nowPlaying.volume = newVolume;
		this.setState({ nowPlaying });
	}

	handleGetPlaybackState = async () => {
		const response = await spotifyApi.getMyCurrentPlaybackState();

		if (!response) {
			console.log('There was an error getting playback');
			return;
		}

		this.setState({
			options: { device_id: response.device.id ? response.device.id : null },
			nowPlaying: {
				name: response.item.name,
				albumArt: response.item.album.images[0].url,
				isPlaying: response.is_playing,
				isActive: response.device.is_active,
				volume: response.device.volume_percent,
			},
		});
	}

	render() {
		const { nowPlaying } = this.state;

		return (
			<Row className="w-100 my-3">
				<Col xs="6">
					<Card>
						<CardBody>
							<CardTitle>
								{
									nowPlaying.isActive ? (
										nowPlaying.isPlaying ? `Now Playing: ${nowPlaying.name}` : 'Playback Paused'
									) : (
										'There is not an active device'
									)
								}
							</CardTitle>
							{ nowPlaying.isActive && (
								<Fragment>
									<img src={nowPlaying.albumArt} className="m-1" alt="album art" style={{ height: 150 }} />
									<Button color="primary" className="m-1" onClick={() => this.handleSetVolume(-10)}>Volume -10</Button>
									<Button color="primary" className="m-1" onClick={() => this.handleSetVolume(10)}>Volume +10</Button>
								</Fragment>
							)}
						</CardBody>
					</Card>
				</Col>
				<Col xs="6">
					<Card>
						<CardBody>
							<CardTitle>Player Management</CardTitle>
							<Button color="primary" className="m-1" onClick={this.handleGetPlaybackState}>Get Playback</Button>
							<Button color="primary" className="m-1" onClick={this.handleGetDevices}>Get Devices</Button>
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
		);
	}
}

Player.propTypes = {
	getToken: PropTypes.func,
};

export default Player;
