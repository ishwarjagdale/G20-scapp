import axios from "axios";

axios.defaults.withCredentials = true;
const api = process.env.REACT_APP_API_URL;

const getLanguage = () => JSON.parse(localStorage.getItem('languagePreference'))?.languageCode || 'en'

async function getPopulars() {
    return axios.get(`${api}/api/${getLanguage()}/populars`)
}

async function getCategories() {
    return axios.get(`${api}/api/${getLanguage()}/categories`)
}

async function getCategory(category) {
    return axios.get(`${api}/api/${getLanguage()}/categories/${category}`)
}

async function getMonument(monument_id, detailed=false, language=null) {
    return axios.get(`${api}/api/${language || getLanguage()}/monument/${monument_id}?detailed=${detailed}`)
}

async function getMonuments(ids) {
    return axios.post(`${api}/api/${getLanguage()}/monuments`, ids)
}

async function logIn(credentials) {
    return axios.post(`${api}/auth/login`, credentials);
}

async function getNearby(coordinates) {
    return axios.post(`${api}/api/nearby`, {
            "longitude": coordinates.longitude,
            "latitude": coordinates.latitude,
            "accuracy": coordinates.accuracy
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export {getPopulars, getCategories, getCategory, getMonument, logIn, getMonuments, getLanguage, getNearby};
