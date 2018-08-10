import React, { Component } from 'react';

//COMPONENTS
import ProfileSquare from "./../Components/ProfileSquare"

class CentralContainer extends Component {
    render() {
        return (
            <div className="central-container">
                <ProfileSquare/>
            </div>
        );
    }
}

export default CentralContainer;