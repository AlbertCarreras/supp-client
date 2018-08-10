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
import AdapterLocation from './Adapters/AdapterLocation';
import AdapterUsers from './Adapters/AdapterUsers';


// ACTIONS
import { login, getCurrentGeolocation, getClosestUsers} from './actions';

//COMPONENTS
import Header from './Components/Header'
import WelcomeContainer from './Containers/WelcomeContainer'
import HomeContainer from './Containers/HomeContainer'
import ProfileContainer from './Containers/ProfileContainer'
import Footer from './Components/Footer'

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userId,
      closestUsers: state.closestUsers,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, email, userId, profileImageLink, prevGeolocationLat, prevGeolocationLon) => dispatch(login(username, email, userId, profileImageLink, prevGeolocationLat, prevGeolocationLon)),
    getCurrentGeolocation: (userId, lat, lon) => dispatch(getCurrentGeolocation(userId,lat, lon)),
    getClosestUsers: (closestUsers) => dispatch(getClosestUsers(closestUsers)),
  }
}

class App extends Component {
  
  // AUTO-LOGIN/LOCATE functionality -if token is present in LocalStorage
  getCurrentPosition = () => {
    if (AdapterUser.getToken() && navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        resp => {
          this.props.getCurrentGeolocation(resp.coords.latitude, resp.coords.longitude);
          AdapterLocation.persistCurrentGeolocation(this.props.userId, resp.coords.latitude, resp.coords.longitude);
        }, AdapterLocation.showError)
    }
  }

  componentDidMount(){
    if (AdapterUser.getToken()) {
      AdapterUser.getCurrentUser()
      .then(json => this.props.login(json.username, json.email, json.id, json.profile_image, json.lat, json.lon))
      .catch(err => {
        AdapterUser.deleteToken();
      })
      AdapterUsers.getClosestUsers()
      .then(json => this.props.getClosestUsers(json))
    }
  }

  componentDidUpdate(prevProps){
    return this.props.userId !== prevProps.userId 
    ? this.getCurrentPosition()
    : null
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));