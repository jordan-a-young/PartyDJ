import React, { Component, Fragment } from 'react';
import { Button, Container } from 'reactstrap';
import Login from '../../Services/Login';
import Player from '../Player';
import Playlist from '../Playlist';

class Main extends Component {
	state = {
		token: '',
		loggedIn: false,
	}
	
	handleLogin = () => {
		return this.setState(prevState => 
			({ loggedIn: !prevState.loggedIn })
			)
		}
		
		getToken = () => { 
		const login = new Login();
		return login.getToken();
	}

	render() {
		const { loggedIn } = this.state;

		if (loggedIn) this.getToken()

		return (
			<Container>
				<Button color="primary" onClick={this.handleLogin}>{loggedIn ? 'Logout' : 'Login'}</Button>
				{
					loggedIn && (
						<Fragment>
							<Player getToken={this.getToken} />
							<Playlist getToken={this.getToken} />
						</Fragment>
					)
				}
			</Container>
		);
	}
}

export default Main;
