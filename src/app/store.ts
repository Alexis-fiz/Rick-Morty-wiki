import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import charactersSlice from '../features/characters/charactersSlice';
import characterSlice from '../features/character/characterSlice';
import counterReducer from '../features/counter/counterSlice';
import guessCharacterSlice from '../features/guess-game/guessCharacterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    characters: charactersSlice,
    character: characterSlice,
    guessCharacter: guessCharacterSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
