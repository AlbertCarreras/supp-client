import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';

// ACTIONS
import { logout } from '../actions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        username: state.username.charAt(0).toUpperCase() + state.username.slice(1),
        loggedIn: state.loggedIn,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
  }
  
const UserProfileBar = (props) => {
    function handleLogout() {
        AdapterUser.deleteToken();
        props.logout();
        props.history.push('/login');
    }

    function toggleLogin() {
        if (props.loggedIn) {
            return (
                <div className="user-profile-bar">
                    <p>{`Welcome, ${props.username}`}</p>
                    <button onClick={()=>handleLogout()}>Log Out</button>
                </div>
            )
        }
        return null
    }

    return toggleLogin()
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfileBar));