import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8000/api/"
})
const response = await api.get('reviews/')
const all_reviews = response.data;

export default all_reviews;