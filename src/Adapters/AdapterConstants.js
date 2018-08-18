export const API = 'http://localhost:3000/api/v1';

export const HEADER_JWT_JSON = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
}

export const HEADER_JWT = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
}

export const HEADER_JSON = {
    "Content-Type": "application/json",
}