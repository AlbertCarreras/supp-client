import React from 'react';
import { NavLink } from 'react-router-dom';

// ADAPTERS
import {config} from './../Adapters/AdapterConstants'

//COMPONENTS
import ProfileNavBar from './ProfileNavBar'
import IconMenuHeader from './IconMenuHeader';

const Header = () => {
    return (
            <div className="app-header">
                <NavLink to={config.route.URL_HOME} exact>
                    <p className="header-logo animated rubberBand delay-2s">Supp</p>
                </NavLink>
                <div className="app-screen-icons">
                
                </div>
                <div className="screen-app-icon-header">
                    <IconMenuHeader />
                </div>
                <ProfileNavBar />
            </div>
    );
};

export default Header;