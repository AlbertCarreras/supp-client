import React, { Component} from 'react';
import { withRouter, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';

// ACTIONS
import { login } from '../actions';

// REDUX PROPS 
const mapDispatchToProps = dispatch => {
  return {
    login: (username, email, userId, bio, userInterests, profileImageLink, prevGeolocationLat, prevGeolocationLon) => dispatch(login(username, email, userId, bio, userInterests, profileImageLink, prevGeolocationLat, prevGeolocationLon))
  }
}

class Login extends Component {
  // keeping local state
  state = {
    email: "",
    password: "",
  };

  //PROPS FUNCTIONALITY: Button handlers
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = () => {
    AdapterUser.login(this.state)
      .then(json => {
        AdapterUser.setToken(json.jwt);
        AdapterUser.getCurrentUser()
        .then(json => this.props.login(json.username, json.email, json.id, json.bio, json.userInterests, json.profile_image, json.lat, json.lon))
        this.props.history.push('/home');
      })
      .catch(err => {
        this.props.history.push('/login');
      })
  }

  render() {
    return (
      <div className="overlay-box login">
        <div className="login-signup-form">
          <h3 className="login-form-header">LOG IN</h3>
            <div className="ui tiny form">
              <div className="two fields">
                <div className="field">
                  <input 
                    type="text"
                    name="email"
                    placeholder="Account Email"
                    onChange={this.handleChange}
                    value={this.state.email} />
                </div>
                <div className="field">
                  <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </div>
              </div>
              <div className="btn-submit">
                <div 
                  className="ui submit button"
                  onClick={this.handleSubmit}
                >Log me in!</div>
              </div>      
            </div>      
        </div>
        <h3>New to Supp? <NavLink to="/signup" exact>Sign up!</NavLink></h3>

      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Login));