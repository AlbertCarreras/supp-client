import React, { Component, Fragment } from 'react';

// ADAPTERS
import AdapterUser from './../Adapters/AdapterUser';

// ACTIONS
import { saveProfile } from '../actions';

// REDUX PROPS 
const mapDispatchToProps = dispatch => {
  return {
    saveProfile: (username, email, userId) => dispatch(saveProfile(username, email, userId))
  }
}

class ProfileContainer extends Component {

    // keeping local state
    state = {
        username: "",
        bio: "",
        photo: ""
    };

    //PROPS FUNCTIONALITY: Button handlers
    handleChange = (event) => {
        this.setState({
        [event.target.name]: event.target.value,
        })
    }

    handleSubmit = () => {
        AdapterUser.signup(this.state)
        .then(json => json.ok
            ? AdapterUser.login(this.state)
            .then(json => {
            AdapterUser.setToken(json.jwt);
            AdapterUser.getCurrentUser()
            .then(json => this.props.login(json.username, json.email, json.id));
            this.props.history.push('/home');
            })
            : console.log("error")
        )
    }

    render() {
        return (
            <Fragment>
                <div className="profile-container">
                <label htmlFor="email"> Username </label>
                <input
                    type="text"
                    name="Username"
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
                    placeholder="Select a photo"
                    onChange={this.handleChange}
                />
                <br/>
                <button type="submit" onClick={this.handleSubmit}>Save Profile</button>            
                </div>
            </Fragment>
        );
    }
}
export default connect(null, mapDispatchToProps)(withRouter(ProfileContainer));