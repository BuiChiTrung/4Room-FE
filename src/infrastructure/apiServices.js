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
    getAPost,
    downFile
}
