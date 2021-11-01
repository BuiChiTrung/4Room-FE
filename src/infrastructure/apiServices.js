import noAuthApiConfig from "@/infrastructure/noAuthApi";
import axios from 'axios';

const baseApiUrl = 'http://localhost:8000';

function login(data) {
    return axios.post( baseApiUrl + '/login', data, noAuthApiConfig);
}

function register(data) {
    return axios.post(baseApiUrl + '/register', data, noAuthApiConfig);
}

export {login, register};
