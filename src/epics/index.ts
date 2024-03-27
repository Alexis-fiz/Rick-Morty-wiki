import { combineEpics } from 'redux-observable';
import { fetchCharacterEpic } from './characterEpics';

export const rootEpic = combineEpics(
  fetchCharacterEpic
  // Add more epics here if needed
);