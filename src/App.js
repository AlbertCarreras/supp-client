import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from "react-router-dom";
import { ActionCableProvider } from 'react-actioncable-provider';
import { hot } from 'react-hot-loader';

// ADAPTERS
import AdapterUser from './Adapters/AdapterUser';
import { API_WS_ROOT } from './Adapters/AdapterConstants';
import { URL_USER_PROFILE } from './Adapters/AdapterConstants'
import { URL_HOME } from './Adapters/AdapterConstants'
import { URL_ROOT } from './Adapters/AdapterConstants'

// ACTIONS
import { thunkLogin, thunkSaveClosestUsers, thunkPersistCurrentGeolocation, jwtSavedInLocalStorage } from './actions';

//COMPONENTS
import Header from './Components/Header';
import WelcomeContainer from './Components/WelcomeContainer';
import HomeContainer from './Components/HomeContainer';
import UpdateProfile from './Components/UpdateProfile';
import Footer from './Components/Footer';

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
    thunkSaveClosestUsers: () => dispatch(thunkSaveClosestUsers()), 
    thunkLogin: () => dispatch(thunkLogin()), 
    jwtSavedInLocalStorage: () => dispatch(jwtSavedInLocalStorage()), 
    thunkPersistCurrentGeolocation: (userId, lat, lon) => dispatch(thunkPersistCurrentGeolocation(userId,lat, lon)),
  }
}

class App extends Component {
  
  // Helper function. Contains Geolocation Web API code. Persist the coordinates if there is token in localStorage.
  getCurrentPosition = () => {
    if (AdapterUser.getToken() && navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        resp => {
          this.props.thunkPersistCurrentGeolocation(this.props.userId, resp.coords.latitude, resp.coords.longitude);
        })
    }
  }

  // When the component mounts, check if there is token in localStorage. If so, login the user, return the user info & friends.
  componentDidMount(){ 
    if (AdapterUser.getToken()) {
      AdapterUser.saveTokenAsCookie();
      this.props.jwtSavedInLocalStorage();
      this.props.thunkLogin();
      this.props.thunkSaveClosestUsers();
    }
  }

  // When the component updates, check for several conditional statements.
  componentDidUpdate(prevProps){
    // Check if state has new UserId. If so, get current position.
    if (this.props.userId !== prevProps.userId) {
      this.getCurrentPosition();
    }

    // Check if state has new coordinates. If so, return closest friends if the user id logged in.
    if (this.props.userId !== null) {
      if (this.props.lat !== prevProps.lat || this.props.lon !== prevProps.lon) {
        return this.props.loggedIn 
        ? this.props.thunkSaveClosestUsers()
        : null
      }
    }

    // Check if the user just logged in and the JWT token got saved in localStorage. If so, login the user, return the user info & friends.
    if (prevProps.jwtToken === false && this.props.jwtToken === true) {
      
      if (AdapterUser.getToken()) {
        AdapterUser.saveTokenAsCookie();
        this.props.thunkLogin();
        this.props.thunkSaveClosestUsers();
      }

    }
  }

  // Check if there is a userId in localStorage. If so, check if the userId is already in state. Then, connect to websockets and reroute user.
  // There is a wss uri query param for identifying user on websocket connection.
  // In any other case, go to Welcome container.
  routerFunction = () => {

      return AdapterUser.getToken()
      ? !!this.props.userId
          ? <ActionCableProvider url={API_WS_ROOT+`?user=${this.props.userId}`}>
              <Switch>
                <Route
                  path={URL_USER_PROFILE}
                  component={UpdateProfile}
                />
                <Route
                  path={URL_HOME}
                  component={HomeContainer}
                />
                <Route
                  path={URL_ROOT}
                  component={HomeContainer}
                />
              </Switch>
            </ActionCableProvider>
        : <Route
            path={URL_ROOT}
            component={WelcomeContainer}
          />
    : <Route
          path={URL_ROOT}
          component={WelcomeContainer}
      />
  }

  render() {
    return (
      <div className="app">
        <Header />
        {this.routerFunction()}
        <Footer />   
      </div>
    )
  }
}

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));