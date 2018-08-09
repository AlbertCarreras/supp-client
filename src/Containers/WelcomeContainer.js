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
                    <img src="/assets/helena-lopes-459331-unsplash.jpg" alt="Photo by Helena Lopes on Unsplash"/>
                    <img src="/assets/mike-erskine-144525-unsplash.jpg" alt="Photo by Mike Erskine on Unsplash"/>
                    <img src="/assets/alexis-brown-82988-unsplash.jpg" alt="Photo by Alexis Brown on Unsplash"/>
                </div>
                <div className="column">
                    <img src="/assets/ben-duchac-66002-unsplash.jpg" alt="Photo by Ben Duchac on Unsplash"/>
                    <img src="/assets/kelsey-chance-575541-unsplash.jpg" alt="Photo by Kelsey Chance on Unsplash"/>
                    <img src="/assets/anthony-intraversato-455600-unsplash.jpg" alt="Photo by Anthony Intraversato on Unsplash"/>
                </div> 
                <div className="column">
                    <img src="/assets/mike-erskine-144525-unsplash.jpg" alt="Photo by Mike Erskine on Unsplash"/>
                    <img src="/assets/alexis-brown-82988-unsplash.jpg" alt="Photo by Alexis Brown on Unsplash"/>
                    <img src="/assets/roman-kraft-669711-unsplash.jpg" alt="Photo by Roman Kraft on Unsplash"/>
                </div>
                <div className="column">
                    <img src="/assets/roman-kraft-669711-unsplash.jpg" alt="Photo by Roman Kraft on Unsplash"/>
                    <img src="/assets/kelsey-chance-575541-unsplash.jpg" alt="Photo by Kelsey Chance on Unsplash"/>
                    <img src="/assets/ben-duchac-66002-unsplash.jpg" alt="Photo by Ben Duchac on Unsplash"/>                    
                </div>
            </div>
        </div>
        </Fragment>
    );
};

export default WelcomeContainer;