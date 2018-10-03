import React, {Fragment} from 'react';
import {Route, Switch} from "react-router-dom";

//ADAPTERS
import {GITHUB_URL_ROOT} from './../Adapters/AdapterConstants'
import {URL_ROOT} from './../Adapters/AdapterConstants'
import {URL_LOGIN} from './../Adapters/AdapterConstants'

//COMPONENTS
import Login from './Login'
import Signup from './Signup'

const WelcomeContainer = () => {
    return (
        <Fragment>

            <Switch>
                <Route
                    exact path={URL_LOGIN}
                    component={Login}
                />
                <Route
                    path={URL_ROOT}
                    component={Signup}
                />    
            </Switch>
            
            {/* Background images collage */}
            <div className="welcome-container">
                <div className="row"> 
                    <div className="column">
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/helena-lopes-459331-unsplash.jpg"} alt="Photographer: Helena Lopes on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/mike-erskine-144525-unsplash.jpg"} alt="Photographer: Mike Erskine on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/alexis-brown-82988-unsplash.jpg"} alt="Photographer: Alexis Brown on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/ben-duchac-66002-unsplash.jpg"} alt="Photographer: Ben Duchac on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/kelsey-chance-575541-unsplash.jpg"} alt="Photographer: Kelsey Chance on Unsplash"/>
                    </div>
                    <div className="column">
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/ben-duchac-66002-unsplash.jpg"} alt="Photographer: Ben Duchac on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/kelsey-chance-575541-unsplash.jpg"} alt="Photographer: Kelsey Chance on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/anthony-intraversato-455600-unsplash.jpg"} alt="Photographer: Anthony Intraversato on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/roman-kraft-669711-unsplash.jpg"} alt="Photographer: Roman Kraft on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/kelsey-chance-575541-unsplash.jpg"} alt="Photographer: Kelsey Chance on Unsplash"/>
                    </div> 
                    <div className="column">
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/mike-erskine-144525-unsplash.jpg"} alt="Photographer: Mike Erskine on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/alexis-brown-82988-unsplash.jpg"} alt="Photographer: Alexis Brown on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/roman-kraft-669711-unsplash.jpg"} alt="Photographer: Roman Kraft on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/helena-lopes-459331-unsplash.jpg"} alt="Photographer: Helena Lopes on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/mike-erskine-144525-unsplash.jpg"} alt="Photographer: Mike Erskine on Unsplash"/>
                    </div>
                    <div className="column">
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/roman-kraft-669711-unsplash.jpg"} alt="Photographer: Roman Kraft on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/kelsey-chance-575541-unsplash.jpg"} alt="Photographer: Kelsey Chance on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/ben-duchac-66002-unsplash.jpg"} alt="Photographer: Ben Duchac on Unsplash"/>  
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/ben-duchac-66002-unsplash.jpg"} alt="Photographer: Ben Duchac on Unsplash"/>
                        <img src={GITHUB_URL_ROOT+"/assets/welcome_images/kelsey-chance-575541-unsplash.jpg"} alt="Photographer: Kelsey Chance on Unsplash"/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default WelcomeContainer;