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
    return fetch(`${API}/current_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.getToken()
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

  static login(route, loginState) {
    return fetch(`${API}/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginState)
    })
    .then(resp => resp.json())
  }

}

export default AdapterUser;
