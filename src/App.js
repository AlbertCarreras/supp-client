import React, { Component } from 'react';
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
import Footer from './Components/Footer'

// REDUX PROPS 
const mapDispatchToProps = dispatch => {
  return {
    login: (username, userId) => dispatch(login(username, userId))
  }
}

class App extends Component {
  
  // AUTO-LOGIN functionality -if token is present in LocalStorage
  componentDidMount(){
    if (AdapterUser.getToken()) {
      AdapterUser.getCurrentUser()
      .then(json => this.props.login(json.username, json.id))
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
          ? <Route
              path="/home"
              component={HomeContainer}
            />
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