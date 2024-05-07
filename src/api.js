import { axios } from "./utils/axios";

const fetchStatistics = async () => {
  try {
    const response = await axios.get('/by-date-statistic');
    return response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};
// console.log(fetchStatistics);

const fetchStatusStatistics = async () => {
  try {
    const response = await axios.get('/by-status-statistic');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};

const fetchRequestStatistics = async () => {
  try {
    const response = await axios.get('/by-request-type-statistic');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};

export {
  fetchStatistics,
  fetchRequestStatistics,
  fetchStatusStatistics  
};
