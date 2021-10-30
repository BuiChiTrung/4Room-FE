import noAuthApiConfig from "@/infrastructure/noAuthApi";
import axios from 'axios';

const baseApiUrl = 'http://localhost:8000/api';

function login(data) {
    return axios.post( baseApiUrl + '/login', data, noAuthApiConfig);
}

export {login};
