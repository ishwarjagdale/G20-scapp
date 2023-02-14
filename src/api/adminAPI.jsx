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

async function manageLanguage(method, monument_id, payload) {
    if(method === "POST")
        return axios.post(`${api}/admin/monuments/${monument_id}/description`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    if(method === "DELETE")
        return axios.delete(`${api}/admin/monuments/${monument_id}/description?lang=${payload.language}`);
}


async function newImage(monument_id, image) {
    return axios.post(`${api}/admin/monuments/${monument_id}/images`, image)
}
async function deleteImage(monument_id, image) {
    return axios.delete(`${api}/admin/monuments/${monument_id}/images?image=${image}`)
}

async function editMonument(monument_id) {
    return axios.get(`${api}/admin/edit/${monument_id}`);
}

async function deleteMonument(monument_id) {
    return axios.delete(`${api}/admin/monuments/${monument_id}`);
}

async function updateUser(payload) {
    return axios.post(`${api}/auth/settings`, payload);
}

export {isSecure, logOut, newLocation, getAllMonuments, manageLanguage, deleteImage, editMonument, deleteMonument, newImage, updateUser};
