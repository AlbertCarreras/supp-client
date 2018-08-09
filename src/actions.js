import {LOGIN, LOGOUT} from './types';

export function login(username, userId) {
    return {
        type: LOGIN,
        payload: {
            username: username,
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