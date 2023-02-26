export type Nullable<T> = T | null;

export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: IExtraInfo;
    location: IExtraInfo;
    image: string;
    episode: string[];
    url: string;
    created: string;
    firstEpisode?: IEpisode;
    episodeList?: IEpisode[]
}

export interface IOption {
    value: string;
    label: string;
}

export interface IEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url:string;
    created: string;
}

export interface IExtraInfo {
    name: string;
    url: string;
}

export interface IInfo {
    count: number;
    pages: number;
    next: Nullable<string>;
    prev: Nullable<string>;
}

export interface IParams {
    name: string;
    pages: number | string;
    status: string;
}

export enum StatusLabel {
  ANY = 'Any',
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKOWN = 'Unknown',
}

export enum StatusValue {
  ANY = '',
  ALIVE = 'alive',
  DEAD = 'dead',
  UNKOWN = 'unknown',
}