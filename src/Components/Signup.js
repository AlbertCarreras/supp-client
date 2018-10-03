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
    checkboxColor: "black",
    errorMessage: {},
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
    })
  }

  // Helper method to display error messages under each field.
  displayError = (field) => {
    return this.state.errorMessage[field] 
    ? <p>{this.state.errorMessage[field]}</p>
    : null
  }

  // Display messages if there are no error messages.
  displayMessages = () => {
    if (Object.keys(this.state.errorMessage).length === 0) {
    return <div>
            <h3 className="signup-message">Find people around you</h3>
            <h3 className="signup-message">Who love what you love</h3>
            <h3 className="signup-message signup-message-connect">Connect!</h3>
            <h3 className="signup-message">and make new friends</h3>
        </div>    
    }
  }
  
  // Front-end validation of entered fields.
  // Check if fields meet criteria; otherwise save messages as key:values for each field.
  // Set state and then handleSubmit making sure state was set. 
  evaluateFields = (event) => {
    if (event.key !== "Enter") {
      return
    }
    let errorMessageArray = {};
    if (!this.state.username.trim()) {
      errorMessageArray["username"] = "Enter a username.";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
      errorMessageArray["email"] = "Invalid email address.";
    }
    if (!(this.state.password.length > 7)) {
      errorMessageArray["password"] = "Password must be at least 8 characters.";
    }
    if (!!(this.state.password.length > 7)) {
      if (!(this.state.password === this.state.confirmPassword)) {
        errorMessageArray["confirmation"] = "Confirmation password must match password.";
      }
    }
    this.setState({
      errorMessage: errorMessageArray,
      checkboxColor: !this.state.agreedCheckbox ? "red" : "black",
    }, () => {
      this.handleSubmit()
    });
  }

  // Check if terms and conditions checkbox is selected. If so, signup the user. If not, style  box in red.
  // Catch error and redirect to Login/Signup
  handleSubmit = () => {
    return (!Object.keys(this.state.errorMessage).length && this.state.agreedCheckbox)
    ?  AdapterUser.signup(this.state)
      .then(json => { 
        if (json.ok) {
            AdapterUser.login(this.state)
            .then(json => {
              AdapterUser.setToken(json.jwt);
              AdapterUser.saveTokenAsCookie();
              this.props.jwtSavedInLocalStorage();
              this.props.history.push(URL_HOME);
            })
            .catch(() => {
              this.props.history.push(URL_SIGNUP);
            })
           } 
        else{ 
          json.json()
          .then(r => {
            let errorMessageArray = {"email": r.errors[0]}
            this.setState({
              errorMessage: errorMessageArray,
            })
          })
        }
      })
      .catch(() => {
        this.props.history.push(URL_SIGNUP);
      })
    : null;
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
                  onKeyUp={this.evaluateFields}
                  value={this.state.username}
                /> 
                {this.displayError("username")}
              </div>  
              <div className="field">
                <input
                  type="text"
                  name="email"
                  placeholder="Account Email"
                  onChange={this.handleChange}
                  onKeyUp={this.evaluateFields}
                  value={this.state.email}
                />
                {this.displayError("email")}
              </div>
            </div>  
            <div className="two fields">
                <div className="field">
                  <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    onKeyUp={this.evaluateFields}
                    value={this.state.password}
                  />
                  {this.displayError("password")}
                </div>
                <div className="field">
                  <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    onKeyUp={this.evaluateFields}
                    value={this.state.confirmPassword}
                  />
                  {this.displayError("confirmation")}
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
                    style={{color: `${this.state.checkboxColor}`}}
                    >I agree to the Terms and Conditions
                  </label>
                </div>
                <div 
                  className="ui submit button"
                  onClick={this.evaluateFields}
                >Create Account
                </div>
              </div>
            </div>
          </div>  
          {this.displayMessages()}
        </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Signup));