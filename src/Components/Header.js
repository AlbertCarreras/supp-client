import React from 'react';
import { connect } from 'react-redux';

//COMPONENTS
import Login from './Login'
import UserProfileBar from './UserProfileBar'

// REDUX PROPS 
function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn,
    }
}

const Header = (props) => {

    function toggleLogin() {
        if (props.loggedIn) {
            return <UserProfileBar/>
        }
        return <Login />
    }

    return (
            <div className="app-header">
                <p className="header-logo">Supp</p>
                {toggleLogin()}
            </div>
    );
};

export default connect(mapStateToProps, null)(Header);