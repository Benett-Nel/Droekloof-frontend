import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8000/api/"
})
const response = await api.get('bookings/')
const all_bookings = response.data;

export default all_bookings