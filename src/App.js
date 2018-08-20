import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from "react-router-dom";
import { ActionCableProvider } from 'react-actioncable-provider';

//STYLING
import './App.css';

// ADAPTERS
import AdapterUser from './Adapters/AdapterUser';
import AdapterLocation from './Adapters/AdapterLocation';
import Adapters from './Adapters/Adapters';
import { API_WS_ROOT } from './Adapters/AdapterConstants';


// ACTIONS
import { thunkLogin, login, saveCurrentGeolocation, saveClosestUsers} from './actions';

//COMPONENTS
import Header from './Components/Header'
import WelcomeContainer from './Components/WelcomeContainer'
import HomeContainer from './Components/HomeContainer'
import UpdateProfile from './Components/UpdateProfile'
import Footer from './Components/Footer'

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      jwtToken: state.jwtToken,
      userId: state.userId,
      loggedIn: state.loggedIn,
      closestUsers: state.closestUsers,
      lat: state.lat,
      lon: state.lon,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    thunkLogin: () => dispatch(thunkLogin()), 
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

  getUserFromDb = () => {
    console.log("getUserFromDb");
    AdapterUser.getCurrentUser()
    .then(json => this.props.login(json.username, json.email, json.id, json.bio, json.userInterests, json.profile_image, json.lat, json.lon))
    .catch(err => {
      console.log(err)
      AdapterUser.deleteToken();
      this.props.history.push('/login');
    })
  }

  componentDidMount(){ 
    
    console.log("componentDidMount")
    //token?, then return me the user info & friends. otherwise, do nothing
    if (AdapterUser.getToken()) {
      AdapterUser.saveTokenAsCookie();
      this.getUserFromDb();
      Adapters.getClosestUsers()
      .then(json => this.props.saveClosestUsers(json))
    }

  }

  componentDidUpdate(prevProps){
    // got new UserId?, then get current position
    if (this.props.userId !== prevProps.userId) {

      this.getCurrentPosition();
    
    }

    // position changed?, then get new closest friends
    if (this.props.lat !== prevProps.lat || this.props.lon !== prevProps.lon) {
      
      return this.props.loggedIn 
      ? Adapters.getClosestUsers()
        .then(json => this.props.saveClosestUsers(json))
      : null

    }

    // just logged in and got JWT token saved in localStorage?, then as if   componentDidMount
    if (prevProps.jwtToken === false && this.props.jwtToken === true) {
      
      //BUG IS HERE!!!!!!!!!!!!
      console.log("componentDidUpdateToken")
      if (AdapterUser.getToken()) {
        // AdapterUser.saveTokenAsCookie();
        console.log("BUG LINE", AdapterUser.getToken());
        this.props.thunkLogin();
      //   // this.getUserFromDb();
        // Adapters.getClosestUsers()
        // .then(json => this.props.saveClosestUsers(json))
      }

    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        {
          //if there is token, you're in. If there is not, go to welcome container.
          !!AdapterUser.getToken()
              ? <ActionCableProvider url={API_WS_ROOT}>
                  <Switch>
                    <Route
                      path="/user/profile"
                      component={UpdateProfile}
                    />
                    <Route
                      path="/home"
                      component={HomeContainer}
                    />
                    <Route
                      path="/"
                      component={HomeContainer}
                    />
                  </Switch>
                </ActionCableProvider>
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