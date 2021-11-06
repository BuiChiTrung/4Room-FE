import noAuthApiConfig from "@/infrastructure/noAuthApi";
import axios from 'axios';
import env from '@/env'

function login(data) {
    return axios.post( env.baseApiUrl + '/login', data, noAuthApiConfig);
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

export {
    login,
    upPost,
    upVote,
    fetchPost,
    submitComment
}
