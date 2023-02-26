import { API_URL } from "../helpers/constants";
import axios from 'axios';
import { ICharacter, IParams } from "../helpers/types";


export async function getCharacters(params: IParams) {
    const response = await axios.get(`${API_URL}/character`, {
        params
    })
    const { info, results} = response.data;
    const updatedResults = await Promise.all(results.map(async (character: ICharacter) => {
        const [firstEpidodeUrl] = character.episode;
        const episodeDetails = await getResource(firstEpidodeUrl);
        return {...character, firstEpisode: episodeDetails}
    }));
    return {characters: updatedResults, info}
}

export async function getCharacter(id: string | undefined) {
    const response = await axios.get(`${API_URL}/character/${id}`);
    const {data: character} = response;
    return getEpisodesForCharacter(character)
}

export async function getEpisodesForCharacter(character: ICharacter) {
    const episodeList = await Promise.all(character.episode.map(async ep => {
        return await getResource(ep);
    }));
    return {...character, episodeList};
}

export async function getResource(url: string) {
    const response = await axios.get(url);
    return response.data;
}