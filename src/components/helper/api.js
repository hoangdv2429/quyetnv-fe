'use strict'
import axios from "axios";
import { axiosInstance, headers } from "./config";

export const getIssuer = async () => {
    const response = await axiosInstance.get('/issuers');
    return response.data;
}

export const updateWallet = async (wallet) => {
    const response = await axiosInstance.patch('/issuers', {owner: wallet});
    return response.data;
}

export const updateContractAddress = async (contractAddress) => {
    const response = await axiosInstance.patch('/issuers', {contractAddress: contractAddress});
    return response.data;
}

export const updateDeployTransaction = async (contractAddress, transactionHash, block) => {
    const response = await axiosInstance.post('/transactions', {
        hash: transactionHash,
        contractAddress: contractAddress,
        block: block,
        action: 3,
    })
    return response.data;
}

export const getHistory = async () => {
    const response = await axiosInstance.get('/transactions/list');
    return response.data;
}

export const getBatches = async () => {
    const response = await axiosInstance.get('/certs/batches');
    return response.data;
}

export const getCerts = async () => {
    const response = await axiosInstance.get('/certs/list');
    return response.data;
}

export const verifyJson = async (verifyObject) => { 
    try {
        const response = await axiosInstance.post('/certs/verify', verifyObject);
        return response.data;
    } catch(err) {
        throw err;
    }
    
}

export const revokeData = async (studentIds) => {
    const response = await axiosInstance.post('/certs/revoke', studentIds);
    return response.data;
}

export const wrapData = async (data) =>{
    const response = await axiosInstance.post('/certs/wrap', {certs: data});
    return response.data;
}

export const getPublicCert = async (targetHash) => {
    console.log('di vao day');
    const response = await axiosInstance.get(`/certs/${targetHash}`);
    return response.data;
}

export const getVerifyData = async (targetHash) => {
    const response = await axiosInstance.get(`/certs/verify/${targetHash}`);
    return response.data;
}

export const updateIssuer = async (data) => {
    const response = await axiosInstance.patch('/issuers', data);
    return response.data;
}


