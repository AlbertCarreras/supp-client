import React from 'react';
import { withRouter, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';
import Adapters from './../Adapters/Adapters';
import { config } from './../Adapters/AdapterConstants'

// ACTIONS
import { logout } from './../Actions/userAuthActions';

// REDUX PROPS 
const mapStateToProps = state => {
    return {
        username: Adapters.capitalize(state.userProfile.username),
        loggedIn: state.userAuth.loggedIn,
        profileImageLink: state.userProfile.profileImageLink
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
  }
  
const ProfileNavBar = (props) => {
    
    //Logout. Deletes JWT token from LocalStorage and cleans state.
    function handleLogout() {
        AdapterUser.deleteToken();
        props.logout();
        props.history.push(config.route.URL_LOGIN);
    }

    //Checks if user is logged-in. If so, it displays nanigation bar.
    function toggleLogin() {
        if (props.loggedIn) {
            return (
                <div className="user-profile-bar">
                    <div className="dropdown">
                        <img 
                            className="profile-image animated bounceIn delay-5s shake-slow" 
                            src={Adapters.getStandardImageUrl(props.profileImageLink)}
                            alt="profile" 
                        />
                        <div className="dropdown-content">
                            <div className="dropdown-item">
                                <p>{props.username}</p>
                            </div>
                            <NavLink to={config.route.URL_HOME} exact>Home</NavLink>
                            <NavLink to={config.route.URL_USER_PROFILE}  exact>Profile</NavLink>
                            <NavLink to={config.route.URL_USER_PROFILE} exact>Account</NavLink>
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