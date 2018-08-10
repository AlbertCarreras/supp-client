import React from 'react';
import { withRouter} from 'react-router-dom';

const ProfileSquare = (props) => {
    return (
        <div className="profile-image-space">
            <p className="profile-image-username animated flipInY">{props.username.charAt(0).toUpperCase() + props.username.slice(1)}</p>
            <div className="profile-image-logged animated flipInY"></div>
            <img 
                className="profile-image-list animated flipInY" 
                src={
                    props.profileImageLink !== "undefined"
                    ? `${props.profileImageLink}` 
                    : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
                }
                alt="profile" 
            />
        </div>
    );
};

export default withRouter(ProfileSquare);