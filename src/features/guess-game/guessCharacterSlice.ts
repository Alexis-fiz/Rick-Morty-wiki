import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCharacter } from '../../api/characters';
import { ICharacter, Nullable } from '../../helpers/types';

export interface GuessCharacterState {
  loading: boolean;
  character: Nullable<ICharacter>;
  guessedWord: string;
  tries: number;
}

const initialState: GuessCharacterState = {
  loading: false,
  character: null,
  guessedWord: '',
  tries: 0,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getCharacterAsync = createAsyncThunk(
  'guessCharacter/getRandomCharacter',
  async () => {
    const id = '1'; 
    const character = await getCharacter(id);
    // The value we  becomes the `fulfilled` action payload
    return character;
  }
);


export const guessCharacterSlice = createSlice({
  name: 'guessCharacter',
  initialState,
  reducers: {
    selectCharacter: (state, action) => {
      state.character = action.payload;
    },
    onUpdateWordTyped: (state, action) => {
      state.guessedWord += action.payload;
    },
    onPressBackSpace: (state, action) => {
      state.guessedWord = action.payload.slice(0, -1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacterAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCharacterAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.character = action.payload;
      })
      .addCase(getCharacterAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});



export default guessCharacterSlice.reducer;
export const { onUpdateWordTyped, onPressBackSpace } = guessCharacterSlice.actions;
