import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

// ADAPTERS
import Adapters from './../Adapters/Adapters';

// STYLE CONSTANTS
const divStyleActive = {
    background: '#5CDB95'
};

const divStyleInactive = {
    background: '#05386B'
};


class ProfileSquare extends Component {

    isActive = () => {
        if (this.props.user.active_user) {
            return  divStyleActive
        }
        else {
            return divStyleInactive
        }
    }

    render = () => {
        return (
            <div 
                className="profile-image-space"
                onClick={this.props.handleOpen}
            >
                <div className="profile-image-username animated flipInY">{
                    Adapters.usernameShortFormat(this.props.user.username)
                }</div>
                <div className="profile-image-distance animated flipInY">{this.props.user.distance}</div>
                <div 
                    className="profile-image-logged animated flipInY"
                    style={this.isActive()}
                ></div>
                <img 
                    className="profile-image-list animated flipInY" 
                    src={Adapters.getStandardImageUrl(this.props.user.profileImageLink)}
                    alt="profile" 
                />
            </div>
        );
    }
};

export default withRouter(ProfileSquare);