// ADAPTERS
import {config} from './AdapterConstants'
import {INIT_HEADERS} from './AdapterConstants'

class AdapterUser {

  //JWT management
  // Save JWT token in local storage.
  static setToken(jsonToken) {
    return localStorage.setItem("token", jsonToken)
  }

  // Get JWT token from local storage.
  static getToken() {
    return localStorage.getItem("token")
  }

  // Save token as a cookie so the websocket authentication can retrieve JWT token and identify user.
  // static saveTokenAsCookie() {
  //   document.cookie = 'X-Authorization=' + this.getToken() + '; path=/';
  // }

  // Delete JWT token from local storage.
  static deleteToken() {
    localStorage.removeItem("token")
  }

  // Fetch email/password to login and receive JWT token as a response. JWT is then used in getCurrentUser -Thunk action- ro retrieve user information
  static async login(loginState) {

    let response = await fetch(`${config.url.API_ROOT}/user_token`, {
      method: 'POST',
      headers: INIT_HEADERS,
      body: JSON.stringify({
        "auth": {
          "email": loginState.email.toLowerCase(),
          "password": loginState.password
        }})
    })
    let responseJSON = await response.json()

    return responseJSON
  }

  // Fetch sing-up information to signup and receive JWT token as a response. JWT is then used in getCurrentUser -Thunk action- ro retrieve user information
  static async signup(signupState) {

    let response = await fetch(`${config.url.API_ROOT}/users/create`, {
      method: 'POST',
      headers: INIT_HEADERS,
      body: JSON.stringify({
        "user": {
          "email": signupState.email.toLowerCase(),
          "password": signupState.password,
          "password_confirmation": signupState.confirmPassword,
          "username": signupState.username
        }})
    })

    return response
  }        
}

export default AdapterUser;
