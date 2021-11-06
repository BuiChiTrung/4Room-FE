import noAuthApiConfig from "@/infrastructure/noAuthApi";
import authApiConfig from "@/infrastructure/authApi";
import axios from 'axios';

const baseApiUrl = 'http://localhost:8000/api';

function login(data) {
    return axios.post( baseApiUrl + '/login', data, noAuthApiConfig);
}

function register(data) {
    return axios.post(baseApiUrl + '/register', data, noAuthApiConfig);
}

function logout() {
    return axios.get(baseApiUrl + '/logout', noAuthApiConfig);
}

//* AUTH API *//

function updateProfile(data) {
    return axios.post(baseApiUrl + '/profile', data, authApiConfig);
}


export {login, register, logout, updateProfile};
