// ADAPTERS
import {API_ROOT} from './AdapterConstants'
import {INIT_HEADERS} from './AdapterConstants'
import {AUTH_HEADERS_JSON} from './AdapterConstants'
import {AUTH_HEADERS_IMAGE} from './AdapterConstants'

class AdapterUser {

  static setToken(jsonToken) {
    return localStorage.setItem("token", jsonToken)
  }

  static getToken() {
    return localStorage.getItem("token")
  }

  static saveTokenAsCookie() {
    document.cookie = 'X-Authorization=' + this.getToken() + '; path=/';
  }

  static deleteToken() {
    localStorage.removeItem("token")
  }

  static getCurrentUser() {
    console.log()
    return fetch(`${API_ROOT}/user/auth`, {
      method: "GET",
      headers: AUTH_HEADERS_JSON
    })
    .then(resp =>
      {
        if (resp.ok) {
          return resp.json()
        }
        else {
          console.log("error getCurrentUser()")
        }
    });
  }

  static login(loginState) {
    return fetch(`${API_ROOT}/user_token`, {
    method: 'POST',
    headers: INIT_HEADERS,
    body: JSON.stringify({
      "auth": {
        "email": loginState.email,
        "password": loginState.password
      }})
    })
    .then(resp => resp.json())
  }

  static signup(signupState) {
    return fetch(`${API_ROOT}/users/create`, {
    method: 'POST',
    headers: INIT_HEADERS,
    body: JSON.stringify({
      "user": {
        "email": signupState.email,
        "password": signupState.password,
        "password_confirmation": signupState.confirmPassword,
        "username": signupState.username
      }})
    })
  }

  static uploadProfile(userId, profileImage) {
    let formData = new FormData();
    formData.append('user_id', userId);
    formData.append('profile_image', profileImage);

    return fetch(`${API_ROOT}/users/uploadProfile`, {
    method: 'POST',
    headers: AUTH_HEADERS_IMAGE,
    body: formData
    })
    .then(resp => resp.json())
  }
        

  static  updateProfileInfo(userId, username, bio) {
    let bodyUpdateProfileInfo = {"user": {}};
    
    if (username) {
      bodyUpdateProfileInfo = Object.assign({}, bodyUpdateProfileInfo, {"user": {
        ...bodyUpdateProfileInfo.user,
        "username": username
      }
    })} 

    if (bio) {
      bodyUpdateProfileInfo = Object.assign({}, bodyUpdateProfileInfo, {"user": {
        ...bodyUpdateProfileInfo.user,
        "bio": bio
      }
    })}
    
    return fetch(`${API_ROOT}/user/${userId}`, {
        method: 'PATCH',
        headers: AUTH_HEADERS_JSON,
        body: JSON.stringify(bodyUpdateProfileInfo)
        }).then(resp => resp.json())
  }

  static  persistAddInterests(userId, userInterests) {
    let bodyPersistAddInterests = {"user": {
      "interests": userInterests
    }};
    return fetch(`${API_ROOT}/user/${userId}/interests`, {
        method: 'POST',
        headers: AUTH_HEADERS_JSON,
        body: JSON.stringify(bodyPersistAddInterests)
    })
    .then(resp => resp.json())
  }

  static  persistRemoveInterests(userInterests) {
    let bodyPersistRemoveInterests = {"user": {
      "interests": userInterests
    }};
    return fetch(`${API_ROOT}/user_interests/${userInterests.id}`, {
        method: 'DELETE',
        headers: AUTH_HEADERS_JSON,
        body: JSON.stringify(bodyPersistRemoveInterests)
    }).then(resp => resp.json())
  }
}

export default AdapterUser;
