import axios from "axios";

axios.defaults.withCredentials = true;
const api = process.env.API_URL;

const getLanguage = () => JSON.parse(localStorage.getItem('languagePreference')).languageCode

async function getPopulars() {
    return axios.get(`${api}/api/${getLanguage()}/populars`)
}

async function getCategories() {
    return axios.get(`${api}/api/${getLanguage()}/categories`)
}

async function getCategory(category) {
    return axios.get(`${api}/api/${getLanguage()}/categories/${category}`)
}

async function getMonument(monument_id, detailed=false) {
    return axios.get(`${api}/api/${getLanguage()}/monument/${monument_id}?detailed=${detailed}`)
}

async function logIn(credentials) {
    return axios.post(`${api}/auth/login`, credentials);
}

export {getPopulars, getCategories, getCategory, getMonument, logIn};
