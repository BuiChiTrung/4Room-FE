import noAuthApiConfig from "@/infrastructure/noAuthApi";
import authApiConfig from "@/infrastructure/authApi";
import axios from 'axios';
import { baseApiUrl } from '@/env'


export const authApi = {
    login(data) {
        return axios.post(`${baseApiUrl}/login`, data, noAuthApiConfig);
    },
    register(data) {
        return axios.post(`${baseApiUrl}/register`, data, noAuthApiConfig);
    },
    logout() {
        return axios.get(`${baseApiUrl}/logout`, authApiConfig);
    },
    jwtValidate() {
        return axios.get(`${baseApiUrl}/jwt-validate`, authApiConfig);
    }
}

export const profileApi = {
    getProfile() {
        return axios.get(`${baseApiUrl}/profile`, authApiConfig);
    },
    updateProfile(data) {
        return axios.post(`${baseApiUrl}/profile`, data, authApiConfig);
    },
    searchUserByName(data) {
        return axios.post(`${baseApiUrl}/users/search`, data, authApiConfig);
    },
    getUserInfo(id) {
        return axios.get(`${baseApiUrl}/users/${id}`, authApiConfig);
    }
}

export const followApi = {
    follow(userId) {
        return axios.post(`${baseApiUrl}/follow-user/${userId}`, {}, authApiConfig);
    },
    unFollow(userId) {
        return axios.delete(`${baseApiUrl}/follow-user/${userId}`, authApiConfig);
    },
    suggestFollow() {
        return axios.get(`${baseApiUrl}/follow/suggestion`, authApiConfig);
    }
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

export {
    upPost,
    upVote,
    fetchPost,
    submitComment,
}
