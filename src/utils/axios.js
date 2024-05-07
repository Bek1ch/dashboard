import axios from 'axios';

const login = 'admin';
const password = 'admin';

const axiosInstance = axios.create({
    baseURL: 'https://dashboard.mps.gov.kz/api/',
    auth: {
        username: login,
        password
    },
});

export { axiosInstance as axios}