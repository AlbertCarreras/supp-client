import React from 'react';
import { withRouter, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';
import Adapters from './../Adapters/Adapters';

// ACTIONS
import { logout } from '../actions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        username: Adapters.capitalize(state.username),
        loggedIn: state.loggedIn,
        profileImageLink: state.profileImageLink,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
  }
  
const ProfileNavBar = (props) => {
    function handleLogout() {
        AdapterUser.deleteToken();
        props.logout();
        props.history.push('/login');
    }

    function toggleLogin() {
        if (props.loggedIn) {
            return (
                <div className="user-profile-bar">
                    <div className="dropdown">
                        <img 
                            className="profile-image animated bounceIn delay-5s shake-slow" 
                            src={`${props.profileImageLink}`}
                            alt="profile" 
                        />
                        <div className="dropdown-content">
                            <div className="dropdown-item">
                                <p>{props.username}</p>
                            </div>
                            <NavLink to="/home" exact>Home</NavLink>
                            <NavLink to="/user/profile" exact>Profile</NavLink>
                            <NavLink to="/user/profile" exact>Account</NavLink>
                            <button className="logout-btn" onClick={()=>handleLogout()}>Log Out</button> 
                        </div>
                </div>
                </div>
                    
            )
        }
        return null
    }

    return toggleLogin()
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileNavBar));