'use strict'
import axios from 'axios';

export const axiosInstance = axios.create({
  // eslint-disable-next-line max-len
  baseURL: `http://localhost:3000`,
  timeout: 5000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1c3QyMDIyQGdtYWlsLmNvbSIsImlzc3VlcklkIjoiNjFlNTNmOWY1ZjNjMGRmM2QzOWVmNWU1Iiwicm9sZXMiOlsxXSwiaWF0IjoxNjQ2NzEwNDg3LCJleHAiOjE2NDY3MTQwODd9.J106d7t5_FcE2jbOPnAiM3s6lFT41pjeixSFQIJYfPA`,
  },
}); 


// module.exports = {
//   axiosInstance,
// };
