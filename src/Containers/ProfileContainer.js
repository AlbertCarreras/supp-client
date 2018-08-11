import React, { Component, Fragment } from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';

// ACTIONS
import { saveProfile } from '../actions';
import { saveProfileImage } from '../actions';


// REDUX PROPS 

const mapStateToProps = state => {
    return {
        user_id: state.userId,
        profileImageLink: state.profileImageLink
    }
}

const mapDispatchToProps = dispatch => {
  return {
    saveProfile: (username, bio) => dispatch(saveProfile(username, bio)),
    saveProfileImage: (profileImageLink) => dispatch(saveProfileImage(profileImageLink))
  }
}

class ProfileContainer extends Component {

    // keeping local state
    state = {
        username: "",
        bio: "",
        profile_image: undefined
    };

    //PROPS FUNCTIONALITY: Button handlers
    handleChange = (event) => {
        this.setState({
        [event.target.name]: event.target.value,
        })
    }

    handleUpload = (event) => {
        this.setState({
        [event.target.name]: event.target.files[0],
        })
    }

    handleSubmit = () => {        
        this.state.profile_image 
            ? AdapterUser.uploadProfile(this.props.user_id, this.state.profile_image)
            .then(json => this.props.saveProfileImage(json.url))
            :null
        AdapterUser.updateProfileInfo(this.props.user_id, this.state.username, this.state.bio)
        .then(json => this.props.saveProfile(json.username, json.bio))
        this.props.history.push('/home');
    }

    render() {
        return (
            <Fragment>
                <div className="profile-container">
                <label htmlFor="email"> Username </label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                    value={this.state.username}
                />
                <br/>
                <label htmlFor="bio"> Bio </label>
                <textarea
                    name="bio"
                    placeholder="Few words about yourself"
                    onChange={this.handleChange}
                    value={this.state.bio}
                />
                <br/>
                <label htmlFor="profile_image"> Upload a photo </label>
                <input
                    type="file"
                    name="profile_image"
                    ref={this.fileInput}
                    onChange={this.handleUpload}
                />
                <br/>
                <button type="submit" onClick={this.handleSubmit}>Save Profile</button>            
                </div>
            </Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer));