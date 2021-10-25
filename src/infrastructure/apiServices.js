import authApiConfig from "@/infrastructure/noAuthApi";
import axios from 'axios';

function login(data) {
    authApiConfig.url = authApiConfig.url + '/login';
    authApiConfig.data = data;
    authApiConfig.method = 'POST';
    return axios(authApiConfig);
}

export {login};
