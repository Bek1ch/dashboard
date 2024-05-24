import { axios } from "./utils/axios";

const login = async ({ username, password }) => {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);

    const res = await axios.post("/auth/signin", { username, password });
    console.log(res);
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    console.log(error);
  }
};

const fetchStatistics = async () => {
  try {
    const response = await axios.get("/by-date-statistic", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

const fetchStatusStatistics = async () => {
  try {
    const response = await axios.get("/by-status-statistic", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

const fetchRequestStatistics = async () => {
  try {
    const response = await axios.get("/by-request-type-statistic", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

const fetchDivisionsTableData = async () => {
  try {
    const response = await axios.get("/expert-tree-by-status-statistic", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

export {
  login,
  fetchStatistics,
  fetchRequestStatistics,
  fetchStatusStatistics,
  fetchDivisionsTableData,
};
