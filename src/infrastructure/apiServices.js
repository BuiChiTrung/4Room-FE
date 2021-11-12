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

function upPost(data) {
    return axios.post(`${baseApiUrl}/posts/create`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}

function getAPost(postID) {
    return axios.get(`${baseApiUrl}/posts/${postID}`, authApiConfig)
}

function upVote(addUpvote, postID) {
    return (
        addUpvote ? axios.post(`${baseApiUrl}/upvote-post/${postID}`, null, authApiConfig)
        : axios.delete(`${baseApiUrl}/upvote-post/${postID}`, authApiConfig)
    )
}

function fetchPost(page) {
    return axios.get(`${baseApiUrl}/newsfeed?page=${page}`, authApiConfig)
}

function downFile(data) {
    return axios.get(`${baseApiUrl}/download/files/${data}`, noAuthApiConfig)
}

function submitComment(data, postID) {
    return axios.post(`${baseApiUrl}/posts/${postID}/comments/create`, data, authApiConfig)
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
    getAPost,
    downFile,
    updateProfile,
    searchUserByName,
    getUserInfo,
    follow,
    unFollow,
    getProfile,
    suggestFollow,
    jwtValidate
}
