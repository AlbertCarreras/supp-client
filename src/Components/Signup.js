import React, { Component} from 'react';
import { withRouter, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';
import {URL_LOGIN} from './../Adapters/AdapterConstants'
import {URL_SIGNUP} from './../Adapters/AdapterConstants'
import {URL_HOME} from './../Adapters/AdapterConstants'

// ACTIONS
import { jwtSavedInLocalStorage } from '../actions';

// REDUX PROPS 
const mapDispatchToProps = dispatch => {
  return {
    jwtSavedInLocalStorage: () => dispatch(jwtSavedInLocalStorage()),
  }
}


class Signup extends Component {

  // keeping local state
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedCheckbox: false,
  };

  //PROPS FUNCTIONALITY: Button handlers
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleCheckbox = () => {
    this.setState({
      agreedCheckbox: !this.state.agreedCheckbox,
      error: "black",
    })
  }

  // Check if terms and conditions checkbox is selected. If so, signup the user. If not, style  box in red.
  // Catch error and redirect to Login/Signup
  handleSubmit = () => {
    return this.state.agreedCheckbox
    ?  AdapterUser.signup(this.state)
      .then(json => json.ok
          ? AdapterUser.login(this.state)
            .then(json => {
              AdapterUser.setToken(json.jwt);
              AdapterUser.saveTokenAsCookie();
              this.props.jwtSavedInLocalStorage();
              this.props.history.push(URL_HOME)
            })
            .catch(err => {
              this.props.history.push(URL_LOGIN);
            })
          : console.log("error")
        )
        .catch(err => {
          this.props.history.push(URL_SIGNUP);
        })
    : this.setState({
        error: "red",
      })
  }

  render() {
    return (
      <div className="overlay-box signup">
        <div className="login-signup-form">
          <h3>Have an account? <NavLink to={URL_LOGIN} exact>Log in</NavLink></h3>
          <h3 className="login-form-header">SIGN UP</h3>
          <div className="ui tiny form">
            <div className="two fields">
              <div className="field">
                <input 
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={this.state.username}
                /> 
              </div>  
              <div className="field">
                <input
                  type="text"
                  name="email"
                  placeholder="Account Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </div>
            </div>  
            <div className="two fields">
                <div className="field">
                  <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </div>
                <div className="field">
                  <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    value={this.state.confirmPassword}
                  />
                </div>
            </div>
              <div className="btn-submit">
                <div className="ui checkbox">
                  <input 
                    type="checkbox" 
                    onClick={this.handleCheckbox}
                    checked={this.state.agreed}
                  />
                  <label 
                    className="signup-error"
                    style={{color: `${this.state.error}`}}
                    >I agree to the Terms and Conditions
                  </label>
                </div>
                <div 
                  className="ui submit button"
                  onClick={this.handleSubmit}
                >Create Account
                </div>
              </div>
            </div>
          </div>  
          <div>
            <h3 className="signup-message">Find people around you</h3>
            <h3 className="signup-message">Who love what you love</h3>
            <h3 className="signup-message signup-message-connect">Connect!</h3>
            <h3 className="signup-message">and make new friends</h3>
          </div>
        </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Signup));