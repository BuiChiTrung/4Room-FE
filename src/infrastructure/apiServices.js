import noAuthApiConfig from "@/infrastructure/noAuthApi";
import authApiConfig from "@/infrastructure/authApi";
import axios from 'axios';
import { baseApiUrl, baseStorageAPI } from '@/env'


export const authApi = {
    login(data) {
        return axios.post(`${baseApiUrl}/login`, data, noAuthApiConfig);
    },
    register(data) {
        return axios.post(`${baseApiUrl}/register`, data, noAuthApiConfig);
    },
    changePassword(data) {
        return axios.post(`${baseApiUrl}/change-password`, data, authApiConfig);
    },
    resetPasswordRequest(data) {
        return axios.post(`${baseApiUrl}/reset-password-request`, data, noAuthApiConfig);
    },
    resetPassword(token, password) {
        return axios.post(`${baseApiUrl}/reset-password/?token=${token}`, {password}, noAuthApiConfig);
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
        return axios.post(`${baseApiUrl}/users/profile`, data, authApiConfig);
    },
    searchUserByName(data) {
        return axios.get(`${baseApiUrl}/users/search?name=${data}`, authApiConfig);
    },
    getUserInfo(id) {
        return axios.get(`${baseApiUrl}/users/${id}/profile`, authApiConfig);
    }
}

export const followApi = {
    follow(userId) {
        return axios.post(`${baseApiUrl}/target-users/${userId}/follow`, {}, authApiConfig);
    },
    unFollow(userId) {
        return axios.delete(`${baseApiUrl}/target-users/${userId}/follow`, authApiConfig);
    },
    suggestFollow() {
        return axios.get(`${baseApiUrl}/users/follow/suggestion`, authApiConfig);
    },
    getFollowers(userId) {
        return axios.get(`${baseApiUrl}/users/${userId}/followers`, authApiConfig)
    },
    getFollowing(userId) {
        return axios.get(`${baseApiUrl}/users/${userId}/following`, authApiConfig)
    }
}

export const notificationApi = {
    getNotifications(page = 1) {
        return axios.get(`${baseApiUrl}/notifications?page=${page}`, authApiConfig);
    },
    countUnread() {
        return axios.get(`${baseApiUrl}/notifications/count-unseen`, authApiConfig);
    },
    markAsRead() {
        return axios.post(`${baseApiUrl}/notifications/mark-as-seen`, {}, authApiConfig);
    }
}

export const messageApi = {
    getMessagesInRoom(name, page) {
        return axios.get(`${baseApiUrl}/rooms/${name}/messages?page=${page}`, authApiConfig);
    },
    sendMessage(data, roomName) {
        return axios.post(`${baseApiUrl}/rooms/${roomName}/messages`, data, authApiConfig);
    }
}

export const roomApi = {
    getRoomInfo(roomId) {
        return axios.get(`${baseApiUrl}/rooms/${roomId}`, authApiConfig);
    }
}

function getAPost(postID) {
    return axios.get(`${baseApiUrl}/posts/${postID}`, authApiConfig)
}

function fetchPost(page) {
    return axios.get(`${baseApiUrl}/users/newsfeed?page=${page}`, authApiConfig)
}

function fetchUserPost(page, userID) {
    return axios.get(`${baseApiUrl}/users/${userID}/posts?page=${page}`, authApiConfig)
}

function downFile(data) {
    return `${baseApiUrl}/download/files/${data}`
}

function upPost(data) {
    return axios.post(`${baseApiUrl}/posts`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
}

function updatePostContent(postID, data) {
    return axios.post(`${baseApiUrl}/posts/${postID}`, data, authApiConfig)
}

function deleteAPost(postID) {
    return axios.delete(`${baseApiUrl}/posts/${postID}`, authApiConfig)
}

function submitComment(data, postID) {
    return axios.post(`${baseApiUrl}/posts/${postID}/comments`, data, authApiConfig)
}

function deleteAComment(postID, cmtID) {
    return axios.delete(`${baseApiUrl}/posts/${postID}/comments/${cmtID}`, authApiConfig)
}

function upVote(addUpvote, postID) {
    return (
        addUpvote ? axios.post(`${baseApiUrl}/posts/${postID}/upvote`, null, authApiConfig)
            : axios.delete(`${baseApiUrl}/posts/${postID}/upvote`, authApiConfig)
    )
}

function getUsersUpvote(postID) {
    return axios.get(`${baseApiUrl}/posts/${postID}/upvotes/users`, authApiConfig)
}

function isUpvoted(postID) {
    return axios.get(`${baseApiUrl}/posts/${postID}/upvote`, authApiConfig)
}

function avatarURL(avatarID) {
    return `${baseStorageAPI}/avatar/${avatarID}`
}

function changeAvatar(data) {
    return axios.post(`${baseApiUrl}/change_avatar`, data, authApiConfig)
}

export {
    upPost,
    upVote,
    fetchPost,
    fetchUserPost,
    getUsersUpvote,
    submitComment,
    getAPost,
    downFile,
    isUpvoted,
    updatePostContent,
    deleteAPost,
    deleteAComment,
    avatarURL,
    changeAvatar
}
