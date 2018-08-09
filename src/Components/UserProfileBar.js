import React from 'react';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';

// ACTIONS
import { logout } from '../actions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        username: state.username.charAt(0).toUpperCase() + state.username.slice(1),
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
    }

    return (
        <div className="user-profile-bar">
            <p>{`Welcome, ${props.username}`}</p>
            <button onClick={()=>handleLogout()}>Log Out</button>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileBar);