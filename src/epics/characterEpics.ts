import { ofType } from 'redux-observable';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { fetchCharacter, fetchCharacterFulfilled } from '../features/Charactrer/characterSlice';
import { Observable } from 'rxjs';
import { API_URL } from '../helpers/constants';

export const fetchCharacterEpic = (action$: Observable<any>)  =>
  action$.pipe(
    ofType(fetchCharacter.type),
    mergeMap(action =>
      ajax.getJSON(`${API_URL}/character/${action.payload}`).pipe(
        tap(response => console.log('API Response:', response)),
        map(response => fetchCharacterFulfilled(response))
      )
    )
  );