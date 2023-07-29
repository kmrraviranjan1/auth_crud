import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:5433"
});

export default client