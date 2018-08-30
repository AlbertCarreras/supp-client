import React from 'react';
import { NavLink } from 'react-router-dom';

//COMPONENTS
import ProfileNavBar from './ProfileNavBar'

const Header = () => {

    return (
            <div className="app-header">
                <NavLink to="supp-client/home" exact>
                    <p className="header-logo animated rubberBand delay-2s">Supp</p>
                </NavLink>
                <ProfileNavBar />
            </div>
    );
};

export default Header;