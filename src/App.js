import React, { Component } from 'react';

//STYLING
import './App.css';
//COMPONENTS
import Header from './Components/Header'
import MainContainer from './Containers/MainContainer'
import Footer from './Components/Footer'


class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <MainContainer />
        <Footer />   
      </div>
    );
  }
}

export default App;
