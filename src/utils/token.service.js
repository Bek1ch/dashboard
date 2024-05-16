const USER_TOKEN_NAME = "user";

const setToken = (token) => localStorage.setItem(USER_TOKEN_NAME, token);

const removeToken = () => localStorage.removeItem(USER_TOKEN_NAME);

const getToken = () => localStorage.getItem(USER_TOKEN_NAME);

const TokenService = { setToken, removeToken, getToken };

export { TokenService };
