import React from 'react';

//COMPONENTS
import Login from './Login'

const Header = () => {
    return (
            <div className="app-header">
                <p className="header-logo">Supp</p>
                <Login />
            </div>
    );
};

export default Header;