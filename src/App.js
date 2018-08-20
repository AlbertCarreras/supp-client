import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from "react-router-dom";
import { ActionCableProvider } from 'react-actioncable-provider';

//STYLING
import './App.css';

// ADAPTERS
import AdapterUser from './Adapters/AdapterUser';
import { API_WS_ROOT } from './Adapters/AdapterConstants';

// ACTIONS
import { thunkLogin, thunkSaveClosestUsers, thunkPersistCurrentGeolocation,saveCurrentGeolocation } from './actions';

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
    thunkSaveClosestUsers: () => dispatch(thunkSaveClosestUsers()), 
    thunkLogin: () => dispatch(thunkLogin()), 
    thunkPersistCurrentGeolocation: (userId, lat, lon) => dispatch(thunkPersistCurrentGeolocation(userId,lat, lon)),
    saveCurrentGeolocation: (userId, lat, lon) => dispatch(saveCurrentGeolocation(userId,lat, lon)),
  }
}

class App extends Component {
  
  // AUTO-LOGIN/LOCATE functionality -if token is present in LocalStorage
  getCurrentPosition = () => {
    if (AdapterUser.getToken() && navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        resp => {
          this.props.thunkPersistCurrentGeolocation(this.props.userId, resp.coords.latitude, resp.coords.longitude);
        })
    }
  }

  componentDidMount(){ 
    //token?, then return me the user info & friends. otherwise, do nothing
    if (AdapterUser.getToken()) {
      AdapterUser.saveTokenAsCookie();
      this.props.thunkLogin();
      this.props.thunkSaveClosestUsers();
    }
  }

  componentDidUpdate(prevProps){
    // got new UserId?, then get current position
    if (this.props.userId !== prevProps.userId) {
      this.getCurrentPosition();
    }

    // position changed?, then get new closest friends
    if (this.props.userId !== null) {
      if (this.props.lat !== prevProps.lat || this.props.lon !== prevProps.lon) {
        return this.props.loggedIn 
        ? this.props.thunkSaveClosestUsers()
        : null
      }
    }

    // just logged in and got JWT token saved in localStorage?, then as if   componentDidMount
    if (prevProps.jwtToken === false && this.props.jwtToken === true) {
      
      if (AdapterUser.getToken()) {
        AdapterUser.saveTokenAsCookie();
        this.props.thunkLogin();
        this.props.thunkSaveClosestUsers();
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