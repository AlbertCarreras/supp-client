import React from 'react';

//COMPONENTS
import ProfileNavBar from './ProfileNavBar'

const Header = (props) => {

    return (
            <div className="app-header">
                <p className="header-logo">Supp</p>
                <ProfileNavBar />
            </div>
    );
};

export default Header;