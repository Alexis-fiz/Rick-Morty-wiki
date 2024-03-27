
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../epics';
import counterReducer from '../features/counter/counterSlice';
import charactersReducer from '../features/Characters/charactersSlice';
import characterReducer from '../features/Charactrer/characterSlice';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    characters: charactersReducer,
    character: characterReducer
  },
    // @ts-ignore:
    middleware: [epicMiddleware]
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;