import {LOGIN, LOGOUT, SAVE_PROFILE, SAVE_PROFILE_IMAGE} from './types';

export function login(username, email, userId, profileImageLink) {
    return {
        type: LOGIN,
        payload: {
            username: username,
            email: email,
            userId: userId,
            loggedIn: true,
            profileImageLink: profileImageLink,
        }
    }
}
  
export function logout() {
    return {
        type: LOGOUT,
    }
}

export function saveProfile(username, bio) {
    return {
        type: SAVE_PROFILE,
        payload: {
            username: username,
            bio: bio,
        }
    }
}

export function saveProfileImage(profileImageLink) {
    return {
        type: SAVE_PROFILE_IMAGE,
        payload: {
            profileImageLink: profileImageLink,
        }
    }
}
