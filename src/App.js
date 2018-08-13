import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from "react-router-dom";

//STYLING
import './App.css';

// ADAPTERS
import AdapterUser from './Adapters/AdapterUser';
import AdapterLocation from './Adapters/AdapterLocation';
import Adapters from './Adapters/Adapters';


// ACTIONS
import { login, saveCurrentGeolocation, saveClosestUsers} from './actions';

//COMPONENTS
import Header from './Components/Header'
import WelcomeContainer from './Components/WelcomeContainer'
import HomeContainer from './Components/HomeContainer'
import UserProfile from './Components/UserProfile'
import Footer from './Components/Footer'

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userId,
      loggedIn: state.loggedIn,
      closestUsers: state.closestUsers,
      lat: state.lat,
      lon: state.lon,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, email, userId, bio, userInterests, profileImageLink, prevGeolocationLat, prevGeolocationLon) => dispatch(login(username, email, userId, bio, userInterests,profileImageLink, prevGeolocationLat, prevGeolocationLon)),
    saveCurrentGeolocation: (userId, lat, lon) => dispatch(saveCurrentGeolocation(userId,lat, lon)),
    saveClosestUsers: (closestUsers) => dispatch(saveClosestUsers(closestUsers)),
  }
}

class App extends Component {
  
  // AUTO-LOGIN/LOCATE functionality -if token is present in LocalStorage
  getCurrentPosition = () => {
    if (AdapterUser.getToken() && navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        resp => {
          this.props.saveCurrentGeolocation(resp.coords.latitude, resp.coords.longitude);
          AdapterLocation.persistCurrentGeolocation(this.props.userId, resp.coords.latitude, resp.coords.longitude)
          .then(json => this.props.saveCurrentGeolocation(json.lat, json.lon));
        }, AdapterLocation.showError)
    }
  }

  componentDidMount(){
    if (AdapterUser.getToken()) {
      AdapterUser.getCurrentUser()
      .then(json => this.props.login(json.username, json.email, json.id, json.bio, json.userInterests, json.profile_image, json.lat, json.lon))
      .catch(err => {
        AdapterUser.deleteToken();
        this.props.history.push('/login');
      })
      Adapters.getClosestUsers()
      .then(json => this.props.saveClosestUsers(json))
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.userId !== prevProps.userId) {
      this.getCurrentPosition();
    }

    if (this.props.lat !== prevProps.lat || this.props.lon !== prevProps.lon) {
      return this.props.loggedIn 
      ? Adapters.getClosestUsers()
        .then(json => this.props.saveClosestUsers(json))
      : null
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
                component={UserProfile}
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