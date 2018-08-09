import {LOGIN, LOGOUT} from './types';

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