import React from 'react';
import { NavLink } from 'react-router-dom';

// ADAPTERS
import {URL_HOME} from './../Adapters/AdapterConstants'

//COMPONENTS
import ProfileNavBar from './ProfileNavBar'

const Header = () => {

    return (
            <div className="app-header">
                <NavLink to={URL_HOME} exact>
                    <p className="header-logo animated rubberBand delay-2s">Supp</p>
                </NavLink>
                <ProfileNavBar />
            </div>
    );
};

export default Header;