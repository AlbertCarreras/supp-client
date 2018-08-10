import {LOGIN, LOGOUT, SAVE_PROFILE, SAVE_PROFILE_IMAGE, GET_CURRENT_GEOLOCATION, GET_CLOSEST_USERS} from './types';

export function login(username, email, userId, profileImageLink=`/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`, prevGeolocationLat, prevGeolocationLon) {
    return {
        type: LOGIN,
        payload: {
            username: username,
            email: email,
            userId: userId,
            loggedIn: true,
            profileImageLink: profileImageLink,
            prevGeolocationLat: prevGeolocationLat, 
            prevGeolocationLon: prevGeolocationLon, 
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

export function getCurrentGeolocation(lat, lon) {
    return {
        type: GET_CURRENT_GEOLOCATION,
        payload: {
            lat: lat,
            lon: lon,
        }
    }
}

export function getClosestUsers(closestUsers) {
    return {
        type: GET_CLOSEST_USERS,
        payload: {
            closestUsers: closestUsers,
        }
    }
}