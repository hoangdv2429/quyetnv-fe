'use strict'
import axios from 'axios';
import { getAxiosInstance, headers, setAccessToken } from "./config";

export const getIssuer = async () => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.get('/issuers');
    return response.data;
}

export const updateWallet = async (wallet) => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.patch('/issuers', {owner: wallet});
    return response.data;
}

export const updateContractAddress = async (contractAddress) => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.patch('/issuers', {contractAddress: contractAddress});
    return response.data;
}

export const updateDeployTransaction = async (contractAddress, transactionHash, block) => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.post('/transactions', {
        hash: transactionHash,
        contractAddress: contractAddress,
        block: block,
        action: 3,
    })
    return response.data;
}

export const getHistory = async () => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.get('/transactions/list');
    return response.data;
}

export const getBatches = async () => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.get('/certs/batches');
    return response.data;
}

export const getCerts = async () => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.get('/certs/list');
    return response.data;
}

export const verifyJson = async (verifyObject) => { 
    const axiosInstance = getAxiosInstance();
    try {
        const response = await axiosInstance.post('/certs/verify', verifyObject);
        return response.data;
    } catch(err) {
        throw err;
    }
    
}

export const revokeData = async (studentIds) => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.post('/certs/revoke', studentIds);
    return response.data;
}

export const wrapData = async (data) =>{
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.post('/certs/wrap', {certs: data});
    return response.data;
}

export const getPublicCert = async (targetHash) => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.get(`/certs/${targetHash}`);
    return response.data;
}

export const getVerifyData = async (targetHash) => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.get(`/certs/verify/${targetHash}`);
    return response.data;
}

export const updateIssuer = async (data) => {
    const axiosInstance = getAxiosInstance();
    const response = await axiosInstance.patch('/issuers', data);
    return response.data;
}

export const login = async (data) => {
    const instance = axios.create({
        // eslint-disable-next-line max-len
        baseURL: `http://localhost:3000`,
        timeout: 5000,
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    try {
        const response = await instance.post('/auth/login', data);
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.success;
    } catch(e) {
        console.log(e);
        return false;
    }
    
}


