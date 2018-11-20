import React, { Component} from 'react';
import { withRouter, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';
import {URL_SIGNUP} from './../Adapters/AdapterConstants'
import {URL_HOME} from './../Adapters/AdapterConstants'

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

  displayErrors = (field) => {
    return this.props.errorMessages[field] 
    ? <p>{this.props.errorMessages[field]}</p>
    : null
  }

  // Logs in user and saves token in LocalStorage and cookie. If error response, pushes to Login page.
  //NOTE: I should add validation messages.
  pressedEnter = (event) => {
    if (event.key === "Enter" ) {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    this.props.cleanErrorMessages();
    AdapterUser.login(this.state)
    .then(json => { 
        AdapterUser.setToken(json.jwt);
        this.props.jwtSavedInLocalStorage();
        this.props.history.push(URL_HOME)
    })
    .catch(() => {
      this.props.addErrorMessage("invalidCredentials", "The email or password did not match our records.")
    })
  }
 
  render() {
    return (
      <div className="overlay-box login">
        <div className="login-signup-form">
        {this.displayErrors("unauthorizedToken")}
          <h3 className="login-form-header">LOG IN</h3>
            <div className="ui tiny form">
              <div className="two fields">
                <div className="field">
                  <input 
                    type="text"
                    name="email"
                    placeholder="Account Email"
                    onChange={this.handleChange}
                    onKeyUp={this.pressedEnter}
                    value={this.state.email} />
                </div>
                <div className="field">
                  <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    onKeyUp={this.pressedEnter}
                    value={this.state.password}
                  />
                </div>
              </div>
              {this.displayErrors("invalidCredentials")}
              <div className="btn-submit">
                <div 
                  className="ui submit button"
                  onClick={this.handleSubmit}
                >Log me in!</div>
              </div>      
            </div>      
        </div>
        <h3>New to Supp? <NavLink to={URL_SIGNUP} exact>Sign up!</NavLink></h3>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));