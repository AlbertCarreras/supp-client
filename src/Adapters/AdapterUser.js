// ADAPTERS
import {API} from './AdapterConstants'
import {HEADER_JWT_JSON} from './AdapterConstants'
import {HEADER_JWT} from './AdapterConstants'
import {HEADER_JSON} from './AdapterConstants'

class AdapterUser {

  static setToken(jsonToken) {
    return localStorage.setItem("token", jsonToken)
  }

  static getToken() {
    return localStorage.getItem("token")
  }

  static deleteToken() {
    localStorage.removeItem("token")
  }

  static getCurrentUser() {
    return fetch(`${API}/user/auth`, {
      method: "GET",
      headers: HEADER_JWT_JSON
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
    return fetch(`${API}/user_token`, {
    method: 'POST',
    headers: HEADER_JSON,
    body: JSON.stringify({
      "auth": {
        "email": loginState.email,
        "password": loginState.password
      }})
    })
    .then(resp => resp.json())
  }

  static signup(signupState) {
    return fetch(`${API}/users/create`, {
    method: 'POST',
    headers: HEADER_JSON,
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

    return fetch(`${API}/users/uploadProfile`, {
    method: 'POST',
    headers: HEADER_JWT,
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
    
    return fetch(`${API}/user/${userId}`, {
        method: 'PATCH',
        headers: HEADER_JWT_JSON,
        body: JSON.stringify(bodyUpdateProfileInfo)
        }).then(resp => resp.json())
  }

  static  persistAddInterests(userId, userInterests) {
    let bodyPersistAddInterests = {"user": {
      "interests": userInterests
    }};
    return fetch(`${API}/user/${userId}/interests`, {
        method: 'POST',
        headers: HEADER_JWT_JSON,
        body: JSON.stringify(bodyPersistAddInterests)
    })
    .then(resp => resp.json())
  }

  static  persistRemoveInterests(userInterests) {
    let bodyPersistRemoveInterests = {"user": {
      "interests": userInterests
    }};
    return fetch(`${API}/user_interests/${userInterests.id}`, {
        method: 'DELETE',
        headers: HEADER_JWT_JSON,
        body: JSON.stringify(bodyPersistRemoveInterests)
    }).then(resp => resp.json())
  }
}

export default AdapterUser;
