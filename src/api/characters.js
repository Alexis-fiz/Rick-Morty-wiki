import { API_URL } from "../constants/constants";
import axios from 'axios';


export async function getCharacters(params) {
    const response = await axios.get(`${API_URL}/character`, {
        params
    })
    const { info, results} = response.data;
    const updatedResults = await Promise.all(results.map(async character => {
        const [firstEpidodeUrl] = character.episode;
        const episodeDetails = await getResource(firstEpidodeUrl);
        return {...character, firstEpisode: episodeDetails}
    }));
    return {characters: updatedResults, info}
}

export async function getCharacter(id) {
    const response = await axios.get(`${API_URL}/character/${id}`);
    const {data: character} = response;
    return getEpisodesForCharacter(character)
}

export async function getEpisodesForCharacter(character) {
    const episodeList = await Promise.all(character.episode.map(async ep => {
        return await getResource(ep);
    }));
    return {...character, episodeList};
}

export async function getResource(url) {
    const response = await axios.get(url);
    return response.data;
}
