import axios from 'axios'

export const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const getProducts = async () => {
    try {
        const response = await $host.get('products');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при загрузке продуктов');
    }

};
