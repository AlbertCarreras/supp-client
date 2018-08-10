import React, {Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
  

//COMPONENTS
import Login from './../Components/Login'
import Signup from './../Components/Signup'

const WelcomeContainer = () => {
    return (
        <Fragment>
            <Switch>
                <Route
                    exact path="/signup"
                    component={Signup}
                />
                <Route
                    path="/"
                    component={Login}
                />
                
            </Switch>
            <div className="welcome-container">
                <div className="row"> 
                    <div className="column">
                        <img src="/assets/welcome_images/helena-lopes-459331-unsplash.jpg" alt="Photographer: Helena Lopes on Unsplash"/>
                        <img src="/assets/welcome_images/mike-erskine-144525-unsplash.jpg" alt="Photographer: Mike Erskine on Unsplash"/>
                        <img src="/assets/welcome_images/alexis-brown-82988-unsplash.jpg" alt="Photographer: Alexis Brown on Unsplash"/>
                    </div>
                    <div className="column">
                        <img src="/assets/welcome_images/ben-duchac-66002-unsplash.jpg" alt="Photographer: Ben Duchac on Unsplash"/>
                        <img src="/assets/welcome_images/kelsey-chance-575541-unsplash.jpg" alt="Photographer: Kelsey Chance on Unsplash"/>
                        <img src="/assets/welcome_images/anthony-intraversato-455600-unsplash.jpg" alt="Photographer: Anthony Intraversato on Unsplash"/>
                    </div> 
                    <div className="column">
                        <img src="/assets/welcome_images/mike-erskine-144525-unsplash.jpg" alt="Photographer: Mike Erskine on Unsplash"/>
                        <img src="/assets/welcome_images/alexis-brown-82988-unsplash.jpg" alt="Photographer: Alexis Brown on Unsplash"/>
                        <img src="/assets/welcome_images/roman-kraft-669711-unsplash.jpg" alt="Photographer: Roman Kraft on Unsplash"/>
                    </div>
                    <div className="column">
                        <img src="/assets/welcome_images/roman-kraft-669711-unsplash.jpg" alt="Photographer: Roman Kraft on Unsplash"/>
                        <img src="/assets/welcome_images/kelsey-chance-575541-unsplash.jpg" alt="Photographer: Kelsey Chance on Unsplash"/>
                        <img src="/assets/welcome_images/ben-duchac-66002-unsplash.jpg" alt="Photographer: Ben Duchac on Unsplash"/>                    
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default WelcomeContainer;