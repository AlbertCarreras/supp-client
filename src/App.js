import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {
  Route,
  withRouter
} from "react-router-dom";

//STYLING
import './App.css';

// ADAPTERS
import AdapterUser from './Adapters/AdapterUser';

// ACTIONS
import { login } from './actions';

//COMPONENTS
import Header from './Components/Header'
import WelcomeContainer from './Containers/WelcomeContainer'
import HomeContainer from './Containers/HomeContainer'
import ProfileContainer from './Containers/ProfileContainer'
import Footer from './Components/Footer'

// REDUX PROPS 
const mapDispatchToProps = dispatch => {
  return {
    login: (username, email, userId) => dispatch(login(username, email, userId))
  }
}

class App extends Component {
  
  // AUTO-LOGIN functionality -if token is present in LocalStorage
  componentDidMount(){
    if (AdapterUser.getToken()) {
      AdapterUser.getCurrentUser()
      .then(json => this.props.login(json.username, json.email, json.id))
      .catch(err => {
        AdapterUser.deleteToken();
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        {
          !!AdapterUser.getToken()
          ? <Fragment>
              <Route
                path="/user/profile"
                component={ProfileContainer}
              />
              <Route
                path="/home"
                component={HomeContainer}
              />
            </Fragment>
          : <Route
                path="/"
                component={WelcomeContainer}
            />
        }
        <Footer />   
      </div>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));