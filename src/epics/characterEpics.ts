import { Observable, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { concatMap, map, tap } from 'rxjs/operators';
import { fetchCharacter, selectCharacter, fetchCharacterFulfilled } from '../features/Charactrer/characterSlice';
import { ajax } from 'rxjs/ajax';
import { API_URL } from '../helpers/constants';

export const fetchCharacterEpic = (action$: Observable<any>, state$: any) =>
  action$.pipe(
    ofType(fetchCharacter.type),
    concatMap(action => {
      const allCharacters = state$.value.characters.allCharacters;
      const characters = Object.values(allCharacters).flat();
      // @ts-ignore
      const characterFound = characters.find((char) => char.id === parseInt(action.payload));
      if (characterFound) {
        return of(selectCharacter(characterFound));
      } else {
        return ajax.getJSON(`${API_URL}/character/${action.payload}`).pipe(
          tap(response => console.log('API Response:', response)),
          map(response => fetchCharacterFulfilled(response))
        );
      }
    })
  );