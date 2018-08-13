import {
    LOGIN, LOGOUT, 
    SAVE_PROFILE, SAVE_PROFILE_IMAGE, 
    SAVE_CURRENT_GEOLOCATION, SAVE_CLOSEST_USERS,
    ADD_USER_INTERESTS, REMOVE_USER_INTERESTS,
    SELECT_COMMON_INTERESTS, UNSELECT_COMMON_INTERESTS,
} from './types';

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

export function saveCurrentGeolocation(lat, lon) {
    return {
        type: SAVE_CURRENT_GEOLOCATION,
        payload: {
            lat: lat,
            lon: lon,
        }
    }
}

export function saveClosestUsers(closestUsers) {
    return {
        type: SAVE_CLOSEST_USERS,
        payload: {
            closestUsers: closestUsers,
        }
    }
}

export function selectCommonInterests(selectedCommonInterest) {
    return {
        type: SELECT_COMMON_INTERESTS,
        payload: {
            selectedCommonInterest: selectedCommonInterest,
        }
    }
}

export function unselectCommonInterests() {
    return {
        type: UNSELECT_COMMON_INTERESTS,
    }
}

export function addUserInterests(selectedUserInterest) {
    return {
        type: ADD_USER_INTERESTS,
        payload: {
            selectedUserInterest: selectedUserInterest,
        }
    }
}

export function removeUserInterests(selectedUserInterest) {
    return {
        type: REMOVE_USER_INTERESTS,
        payload: {
            selectedUserInterest: selectedUserInterest,
        }
    }
}