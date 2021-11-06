import noAuthApiConfig from "@/infrastructure/noAuthApi";
import axios from 'axios';
import { baseApiUrl } from '@/env'

function login(data) {
    return axios.post( baseApiUrl + '/login', data, noAuthApiConfig);
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
    login,
    upPost,
    upVote,
    fetchPost,
    submitComment
}
