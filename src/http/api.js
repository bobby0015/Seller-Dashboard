import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/seller",
    headers: {
        'Content-Type': 'application/json',
    }
})

const fileApi = axios.create({
    baseURL: "http://localhost:8080/seller",
})

export const login = async (data) => api.post('/login',data);

export const register = async (data) => api.post('/register',data);

export const uploadProduct = async (data) => api.post('/product/create',data);
export const updateProduct = async (data) => api.patch('/product/update',data);

export const uploadImage = async (data) => fileApi.post('/product/image-upload',data);