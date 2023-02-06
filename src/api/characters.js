import { API_URL } from "../constants/constants";
import axios from 'axios';


export async function getCharacters(params) {
    const response = await axios.get(`${API_URL}/character`, {
        params
    })
    const { info, results} = response.data;
    return {characters: results, info}
}

export async function getResource(url) {
    const response = await axios.get(`${url}`)
    return response.data;
}
