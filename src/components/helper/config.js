'use strict'
import axios from 'axios';

export const getAxiosInstance = () => {
  return axios.create({
    // eslint-disable-next-line max-len
    baseURL: `http://localhost:3000`,
    timeout: 5000,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
} 

// module.exports = {
//   axiosInstance,
// };
