import axios from 'axios'

export const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const getProducts = async () => {
    const response = await $host.get('products');
    return response.data;
};
