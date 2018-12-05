const prod = {
  url: {
    API_SHORT_ROOT: 'https://supp-server.herokuapp.com',
    API_ROOT: 'https://supp-server.herokuapp.com/api/v1',
    API_WS_ROOT: 'wss://supp-server.herokuapp.com/api/v1/cable',
    GITHUB_URL_ROOT: 'https://albertcarreras.github.io/supp-client/'
  },
  route: {
    URL_ROOT: '/supp-client',
    URL_HOME: '/supp-client/home',
    URL_LOGIN: '/supp-client/login',
    URL_SIGNUP: '/supp-client/signup',
    URL_USER_PROFILE: '/supp-client/user/profile'
  }
};

const dev = {
  url: {
    API_SHORT_ROOT: 'http://localhost:3000',
    API_ROOT: 'http://localhost:3000/api/v1',
    API_WS_ROOT: 'ws://localhost:3000/api/v1/cable',
    GITHUB_URL_ROOT: ''
  },
  route: {
    URL_ROOT: '/',
    URL_HOME: '/home',
    URL_LOGIN: '/login',
    URL_SIGNUP: '/signup',
    URL_USER_PROFILE: '/user/profile'
  }
};

export const config = process.env.REACT_APP_STAGE === 'dev' ? dev : prod;

//HEADERS
export const AUTH_HEADERS_JSON_JWT =  {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
};

export const AUTH_HEADERS_JWT =  {
  "Authorization": `Bearer ${localStorage.getItem("token")}`
};

export const INIT_HEADERS =  {
    "Accept": "application/json",
    "Content-Type": "application/json",
};