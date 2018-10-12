class Login {
  constructor() {
    this.authEndpoint = 'https://accounts.spotify.com/authorize';
    this.clientId = '86b3966826b949b984fae87920c8d591';
    this.redirectUri = 'http://localhost:3000/';
    this.scopes = ['user-top-read', 'user-read-playback-state', 'user-modify-playback-state'];
  }

  getToken() {
    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      return token;
    }
    
    window.location = `${this.authEndpoint}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scopes.join('%20')}&response_type=token&show_dialog=true`;
  }

  getHashParams = () => {
    let hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    e = r.exec(q);

    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }

    return hashParams;
  }
}

export default Login;
