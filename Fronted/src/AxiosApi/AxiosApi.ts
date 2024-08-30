import axios from 'axios';
import {apiURL} from "./ServerLinks.ts";

const axiosApi = axios.create({
    baseURL: apiURL
});
export default axiosApi;