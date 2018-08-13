import React from 'react';

//COMPONENTS
import ProfileNavBar from './ProfileNavBar'

const Header = () => {

    return (
            <div className="app-header">
                <p className="header-logo animated rubberBand delay-2s">Supp</p>
                <ProfileNavBar />
            </div>
    );
};

export default Header;