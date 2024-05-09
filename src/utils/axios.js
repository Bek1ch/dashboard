import axios from 'axios';

const login = 'admin';
const password = 'admin';

const axiosInstance = axios.create({
    baseURL: 'http://89.219.23.53/api',
    auth: {
        username: login,
        password
    },
});

export { axiosInstance as axios}