import React, {Fragment} from 'react';

//COMPONENTS
import Login from './../Components/Login'
const WelcomeContainer = () => {
    return (
        <Fragment>
        <div className="overlay-box">
            <Login />
        </div>
        <div className="welcome-container">
            <div className="row"> 
                <div className="column">
                    <img src="/assets/helena-lopes-459331-unsplash.jpg" alt="Photographer: Helena Lopes on Unsplash"/>
                    <img src="/assets/mike-erskine-144525-unsplash.jpg" alt="Photographer: Mike Erskine on Unsplash"/>
                    <img src="/assets/alexis-brown-82988-unsplash.jpg" alt="Photographer: Alexis Brown on Unsplash"/>
                </div>
                <div className="column">
                    <img src="/assets/ben-duchac-66002-unsplash.jpg" alt="Photographer: Ben Duchac on Unsplash"/>
                    <img src="/assets/kelsey-chance-575541-unsplash.jpg" alt="Photographer: Kelsey Chance on Unsplash"/>
                    <img src="/assets/anthony-intraversato-455600-unsplash.jpg" alt="Photographer: Anthony Intraversato on Unsplash"/>
                </div> 
                <div className="column">
                    <img src="/assets/mike-erskine-144525-unsplash.jpg" alt="Photographer: Mike Erskine on Unsplash"/>
                    <img src="/assets/alexis-brown-82988-unsplash.jpg" alt="Photographer: Alexis Brown on Unsplash"/>
                    <img src="/assets/roman-kraft-669711-unsplash.jpg" alt="Photographer: Roman Kraft on Unsplash"/>
                </div>
                <div className="column">
                    <img src="/assets/roman-kraft-669711-unsplash.jpg" alt="Photographer: Roman Kraft on Unsplash"/>
                    <img src="/assets/kelsey-chance-575541-unsplash.jpg" alt="Photographer: Kelsey Chance on Unsplash"/>
                    <img src="/assets/ben-duchac-66002-unsplash.jpg" alt="Photographer: Ben Duchac on Unsplash"/>                    
                </div>
            </div>
        </div>
        </Fragment>
    );
};

export default WelcomeContainer;