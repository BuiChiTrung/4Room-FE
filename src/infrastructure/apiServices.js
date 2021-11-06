import noAuthApiConfig from "@/infrastructure/noAuthApi";
import authApiConfig from "@/infrastructure/authApi";
import axios from 'axios';
import env from '@/env'
const baseApiUrl = 'http://localhost:8000/api';

function login(data) {
    return axios.post( baseApiUrl + '/login', data, noAuthApiConfig);
}

function upPost(data, config) {
    return axios.post(`${env.baseApiUrl}/submit-post`, data, config)
}

//TODO: add url
function upVote(data, config) {
    return axios.post(`${env.baseApiUrl}`, data, config)
}

//TODO: add url
function fetchPost(data, config) {
    return axios.get(`${env.baseApiUrl}`, data, config)
}

//TODO: add url
function submitComment(data, config) {
    return axios.post(`${env.baseApiUrl}`, data, config)
}

function register(data) {
    return axios.post(baseApiUrl + '/register', data, noAuthApiConfig);
}

function logout() {
    return axios.get(baseApiUrl + '/logout', noAuthApiConfig);
}

function updateProfile(data) {
    return axios.post(baseApiUrl + '/profile', data, authApiConfig);
}

export {
    login,
    logout,
    register,
    upPost,
    upVote,
    fetchPost,
    submitComment,
    updateProfile
}
