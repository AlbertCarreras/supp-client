import {LOGIN, LOGOUT, SAVE_PROFILE} from './types';

export function login(username, email, userId) {
    return {
        type: LOGIN,
        payload: {
            username: username,
            email: email,
            userId: userId,
            loggedIn: true,
        }
    }
}
  
export function logout() {
    return {
        type: LOGOUT,
    }
}

export function saveProfile() {
    return {
        type: SAVE_PROFILE,
        payload: {
            username: username,
            bio: bio,
        }
    }
}