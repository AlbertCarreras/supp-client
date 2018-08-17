// ADAPTERS
import AdapterUser from './AdapterUser';

//URLS
export const API_ROOT = 'http://localhost:3000/api/v1';
export const API_WS_ROOT = `ws://localhost:3000/api/v1/cable?token=${AdapterUser.getToken()}`;

//HEADERS
export const AUTH_HEADERS =  {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
};
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