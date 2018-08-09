import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

//STYLING
import './App.css';

// ADAPTERS
import AdapterUser from './Adapters/AdapterUser';

//COMPONENTS
import Header from './Components/Header'
import WelcomeContainer from './Containers/WelcomeContainer'
import HomeContainer from './Containers/HomeContainer'
import Footer from './Components/Footer'

class App extends Component {
  
  render() {
    return (
      <div className="app">
        <Header />
        {
          !!AdapterUser.getToken() 
            ? <HomeContainer />
            : <WelcomeContainer />
        }        
        <Footer />   
      </div>
    );
  }
}

export default withRouter(App);