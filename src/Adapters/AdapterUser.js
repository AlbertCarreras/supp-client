export const API = 'http://localhost:3000/api/v1';

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
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.getToken()}`
      }
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
    headers: {
      'Content-Type': 'application/json',
    },
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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "user": {
        "email": signupState.email,
        "password": signupState.password,
        "password_confirmation": signupState.confirmPassword,
        "username": signupState.username
      }})
    })
  }
}
export default AdapterUser;
