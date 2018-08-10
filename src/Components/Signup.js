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
    login: (username, email, userId) => dispatch(login(username, email, userId))
  }
}

class Signup extends Component {

  // keeping local state
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",

  };

  //PROPS FUNCTIONALITY: Button handlers
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = () => {
    AdapterUser.signup(this.state)
    .then(json => json.ok
        ? AdapterUser.login(this.state)
         .then(json => {
          AdapterUser.setToken(json.jwt);
          AdapterUser.getCurrentUser()
          .then(json => this.props.login(json.username, json.email, json.id));
          this.props.history.push('/home');
        })
        : console.log("error")
      )
  }

  render() {
    return (
      <div className="login">
        <h3>Have an account? <NavLink to="/login" exact>Log in</NavLink></h3>
        <h3 className="welcome-form">SIGN UP</h3>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <br/>
        <label htmlFor="email"> Email </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={this.handleChange}
          value={this.state.email}
        />
        <br/>
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <br/>
        <label htmlFor="confirm-password"> Confirm Password </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={this.handleChange}
          value={this.state.confirmPassword}
        />
        <br/>
        <button type="submit" onClick={this.handleSubmit}>Sign up</button>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Signup));