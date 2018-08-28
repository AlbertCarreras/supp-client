//URLS
// export const API_SHORT_ROOT = 'http://localhost:3000';
// export const API_ROOT = 'http://localhost:3000/api/v1';
// export const API_WS_ROOT = 'ws://localhost:3000/api/v1/cable';
// export const GITHUB_URL_ROOT = '';

export const API_SHORT_ROOT = 'https://supp-server.herokuapp.com';
export const API_ROOT = 'https://supp-server.herokuapp.com/api/v1';
export const API_WS_ROOT = 'wss://supp-server.herokuapp.com/api/v1/cable';
export const GITHUB_URL_ROOT = 'https://albertcarreras.github.io/supp-client/';

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