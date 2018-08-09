import React from 'react';

//COMPONENTS
import UserProfileBar from './UserProfileBar'

const Header = (props) => {

    

    return (
            <div className="app-header">
                <p className="header-logo">Supp</p>
                <UserProfileBar />
            </div>
    );
};

export default Header;