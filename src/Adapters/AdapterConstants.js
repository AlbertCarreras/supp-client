//URLS DEVELOPMENT
// export const API_SHORT_ROOT = 'http://localhost:3000';
// export const API_ROOT = 'http://localhost:3000/api/v1';
// export const API_WS_ROOT = 'ws://localhost:3000/api/v1/cable';
// export const GITHUB_URL_ROOT = '';

//ROUTES DEVELOPMENT
// export const URL_ROOT = '/'
// export const URL_HOME = '/home'
// export const URL_LOGIN = '/login'
// export const URL_SIGNUP = '/signup'
// export const URL_USER_PROFILE = '/user/profile'

//URLS PRODUCTION
export const API_SHORT_ROOT = 'https://supp-server.herokuapp.com';
export const API_ROOT = 'https://supp-server.herokuapp.com/api/v1';
export const API_WS_ROOT = 'wss://supp-server.herokuapp.com/api/v1/cable';
export const GITHUB_URL_ROOT = 'https://albertcarreras.github.io/supp-client/';

//ROUTES PRODUCTION
export const URL_ROOT = '/supp-client'
export const URL_HOME = '/supp-client/home'
export const URL_LOGIN = '/supp-client/login'
export const URL_SIGNUP = '/supp-client/signup'
export const URL_USER_PROFILE = '/supp-client/user/profile'

//HEADERS
export const AUTH_HEADERS_JSON =  {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
};

export const AUTH_HEADERS_IMAGE =  {
  "Authorization": `Bearer ${localStorage.getItem("token")}`
};

export const INIT_HEADERS =  {
    "Accept": "application/json",
    "Content-Type": "application/json",
};