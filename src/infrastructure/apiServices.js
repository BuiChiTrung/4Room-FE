import noAuthApiConfig from "@/infrastructure/noAuthApi";
import authApiConfig from "@/infrastructure/authApi";
import axios from 'axios';
import { baseApiUrl } from '@/env'

function login(data) {
    return axios.post(`${baseApiUrl}/login`, data, noAuthApiConfig);
}

function register(data) {
    return axios.post(`${baseApiUrl}/register`, data, noAuthApiConfig);
}

function logout() {
    return axios.get(`${baseApiUrl}/logout`, authApiConfig);
}

function jwtValidate() {
    return axios.get(`${baseApiUrl}/jwt-validate`, authApiConfig);
}

function getProfile() {
    return axios.get(`${baseApiUrl}/profile`, authApiConfig);
}

function updateProfile(data) {
    return axios.post(`${baseApiUrl}/profile`, data, authApiConfig);
}

function searchUserByName(data) {
    return axios.post(`${baseApiUrl}/users/search`, data, authApiConfig);
}

function getUserInfo(id) {
    return axios.get(`${baseApiUrl}/users/${id}`, authApiConfig);
}

function upPost(data, config) {
    return axios.post(`${baseApiUrl}/submit-post`, data, config)
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

function follow(userId) {
    return axios.post(`${baseApiUrl}/follow-user/${userId}`, {}, authApiConfig);
}

function unFollow(userId) {
    return axios.delete(`${baseApiUrl}/follow-user/${userId}`, authApiConfig);
}

function suggestFollow() {
    return axios.get(`${baseApiUrl}/follow/suggestion`, authApiConfig);
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
    searchUserByName,
    getUserInfo,
    follow,
    unFollow,
    getProfile,
    suggestFollow,
    jwtValidate
}
