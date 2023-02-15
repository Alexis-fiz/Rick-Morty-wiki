import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import charactersSlice from '../features/characters/charactersSlice';
import characterSlice from '../features/charactrer/characterSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    characters: charactersSlice,
    character: characterSlice
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
