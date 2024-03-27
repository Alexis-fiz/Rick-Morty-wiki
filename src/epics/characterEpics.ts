import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { fetchCharacter, fetchCharacterFulfilled } from '../features/Charactrer/characterSlice';
import { Observable } from 'rxjs';

export const fetchCharacterEpic = (action$: Observable<any>)  =>
  action$.pipe(
    ofType(fetchCharacter.type),
    mergeMap(action =>
      ajax.getJSON(`/api/character/${action.payload}`).pipe(
        map(response => fetchCharacterFulfilled(response))
      )
    )
  );