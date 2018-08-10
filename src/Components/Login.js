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
    login: (username, email, userId, profileImageLink) => dispatch(login(username, email, userId, profileImageLink))
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
        .then(json => this.props.login(json.username, json.email, json.id, json.profile_image))
        this.props.history.push('/home');
      })
  }

  render() {
    return (
      <div className="login">
        <h3 className="welcome-form">LOG IN</h3>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={this.handleChange}
          value={this.state.email}
        /> 
        <br/>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <br/>        
        <button type="submit" onClick={this.handleSubmit}>Log me in!</button>
        <br/>        
        <br/>        
        <h3>New to Supp? <NavLink to="/signup" exact>Sign up!</NavLink></h3>
        
        
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Login));