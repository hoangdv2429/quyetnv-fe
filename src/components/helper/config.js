'use strict'
import axios from 'axios';

export const axiosInstance = axios.create({
  // eslint-disable-next-line max-len
  baseURL: `http://localhost:3000`,
  timeout: 5000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1c3QyMDIyQGdtYWlsLmNvbSIsImlzc3VlcklkIjoiNjFlNTNmOWY1ZjNjMGRmM2QzOWVmNWU1Iiwicm9sZXMiOlsxXSwiaWF0IjoxNjQ2NjQ4OTA4LCJleHAiOjE2NDY2NTI1MDh9.FeKSues1yfRM0_WuL1LsLDH3T-0cnvkb-V-2MvduKiI`,
  },
}); 


// module.exports = {
//   axiosInstance,
// };
