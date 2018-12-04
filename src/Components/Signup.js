import React, { Component} from 'react';
import { withRouter, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';
import {config} from './../Adapters/AdapterConstants'

// ACTIONS
import { jwtSavedInLocalStorage, addErrorMessage, cleanErrorMessages } from './../Actions/userAuthActions';

// REDUX PROPS 
const mapDispatchToProps = dispatch => {
  return {
    jwtSavedInLocalStorage: () => dispatch(jwtSavedInLocalStorage()),
    addErrorMessage: (key, value) => dispatch(addErrorMessage(key, value)),
    cleanErrorMessages: () => dispatch(cleanErrorMessages()),
  }
}

const mapStateToProps = state => {
  return {
      errorMessages: state.userAuth.errorMessages,
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
  displayErrors = (field) => {
    return this.props.errorMessages[field] 
    ? <p>{this.props.errorMessages[field]}</p>
    : null
  }

  // Display messages if there are no error messages.
  displayMessages = () => {
    if (Object.keys(this.props.errorMessages).length === 0) {
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
  pressedEnter = (event) => {
    if (event.key === "Enter" ) {
      this.evaluateFields();
    }
  }
  
  evaluateFields = () => {
    this.props.cleanErrorMessages();
    var submitSignIn = true;
    if (!this.state.username.trim()) {
      submitSignIn = false;
      this.props.addErrorMessage("username", "Enter a username.")
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
      submitSignIn = false;
      this.props.addErrorMessage("email", "Invalid email address.")
    }
    if (!(this.state.password.length > 7)) {
      submitSignIn = false;
      this.props.addErrorMessage("password", "Password must be at least 8 characters.")
    }
    if (!!(this.state.password.length > 7)) {
      if (!(this.state.password === this.state.confirmPassword)) {
        submitSignIn = false;
        this.props.addErrorMessage("confirmation", "Confirmation password must match password.")
      }
    }
    this.setState({
      // Check if terms and conditions checkbox is selected. If so, signup the user. If not, style  box in red.
      //If none of above conditions apply and agreed to terms, submit.
      checkboxColor: !this.state.agreedCheckbox ? "red" : "black",
    }, () => {
        return submitSignIn && this.state.checkboxColor === "black" 
          ? this.handleSubmit() 
          : null;
        });
  }

  handleSubmit = () => {
    // Signup and get confirmation user was created.
    return  AdapterUser.signup(this.state)
      .then(json => { 
        if (json.ok) {
            // Login with same user and password and get JWT token.
            AdapterUser.login(this.state)
            .then(json => {
              AdapterUser.setToken(json.jwt);
              this.props.jwtSavedInLocalStorage();
              this.props.history.push(config.route.URL_HOME);
            })
            .catch(() => {
              this.props.history.push(config.route.URL_LOGIN);
            })
           } 
        else{ 
          json.json()
          .then(r => {
            this.props.addErrorMessage("email", r.errors[0])
          })
        }
      })
      .catch(() => {
        this.props.history.push(config.route.URL_SIGNUP);
      })
  }

  render() {
    return (
      <div className="overlay-box signup">
        <div className="login-signup-form">
          <h3>Have an account? <NavLink to={config.route.URL_LOGIN} exact>Log in</NavLink></h3>
          <h3 className="login-form-header">SIGN UP</h3>
          <div className="ui tiny form">
            <div className="two fields">
              <div className="field">
                <input 
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  onKeyUp={this.pressedEnter}
                  value={this.state.username}
                /> 
                {this.displayErrors("username")}
              </div>  
              <div className="field">
                <input
                  type="text"
                  name="email"
                  placeholder="Account Email"
                  onChange={this.handleChange}
                  onKeyUp={this.pressedEnter}
                  value={this.state.email}
                />
                {this.displayErrors("email")}
              </div>
            </div>  
            <div className="two fields">
                <div className="field">
                  <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    onKeyUp={this.pressedEnter}
                    value={this.state.password}
                  />
                  {this.displayErrors("password")}
                </div>
                <div className="field">
                  <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    onKeyUp={this.pressedEnter}
                    value={this.state.confirmPassword}
                  />
                  {this.displayErrors("confirmation")}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));