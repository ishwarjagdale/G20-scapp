import axios from "axios";

axios.defaults.withCredentials = true;
const api = process.env.API_URL;

async function isSecure() {
    return axios.get(`${api}/auth`);
}

async function logOut() {
    return axios.get(`${api}/auth/logout`);
}

async function newLocation(payload) {
    return axios.post(`${api}/admin/new`, payload);
}

async function getAllMonuments() {
    return axios.get(`${api}/admin/monuments`);
}

export {isSecure, logOut, newLocation, getAllMonuments};
