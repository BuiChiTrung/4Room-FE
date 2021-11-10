import noAuthApiConfig from "@/infrastructure/noAuthApi";
import authApiConfig from "@/infrastructure/authApi";
import axios from 'axios';
import { baseApiUrl } from '@/env'

function login(data) {
    return axios.post( baseApiUrl + '/login', data, noAuthApiConfig);
}

function upPost(data) {
    return axios.post(`${baseApiUrl}/posts/create`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
    })
}

function getAPost(postID) {
    return axios.get(`${baseApiUrl}/posts/${postID}`, authApiConfig)
}

//TODO: add url
function upVote(data, config) {
    return axios.post(`${baseApiUrl}`, data, config)
}

//TODO: add url
function fetchPost(data, config) {
    return axios.get(`${baseApiUrl}`, data, config)
}

//TODO: add url
function submitComment(data, config) {
    return axios.post(`${baseApiUrl}`, data, config)
}

function register(data) {
    return axios.post(baseApiUrl + '/register', data, noAuthApiConfig);
}

function logout() {
    return axios.get(baseApiUrl + '/logout', authApiConfig);
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
    updateProfile,
    getAPost
}
