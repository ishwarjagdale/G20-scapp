import axios from "axios";

axios.defaults.withCredentials = true;
const api = process.env.REACT_APP_API_URL;

async function isSecure() {
    return axios.get(`${api}/auth`);
}

async function logOut() {
    return axios.get(`${api}/auth/logout`);
}

async function newLocation(payload) {
    // return axios.post(`${api}/admin/new`, payload);
    return axios.post(`${api}/admin/new`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

async function getAllMonuments() {
    return axios.get(`${api}/admin/monuments`);
}

export {isSecure, logOut, newLocation, getAllMonuments};
