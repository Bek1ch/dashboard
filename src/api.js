import { axios } from "./utils/axios";

const login = async ({ username, password }) => {
  try {
    const res = await axios.post("/login", { username, password });
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
    const response = await axios.get("/by-date-statistic");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

const fetchStatusStatistics = async () => {
  try {
    const response = await axios.get("/by-status-statistic");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

const fetchRequestStatistics = async () => {
  try {
    const response = await axios.get("/by-request-type-statistic");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
};

const fetchDivisionsTableData = async () => {
  try {
    const response = await axios.get("/expert-tree-by-status-statistic");
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
