import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCharacter } from '../../api/characters';
import { ICharacter, Nullable } from '../../helpers/types';

export interface CharacterState {
  loading: boolean;
  character: Nullable<ICharacter>;
}

const initialState: CharacterState = {
  loading: false,
  character: null,
};

export const getCharacterAsync = createAsyncThunk(
  'character/fetchCharacter',
  async (id: string | undefined) => {
    const character = await getCharacter(id);
    return character;
  }
);


export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    selectCharacter: (state, action) => {
      state.character = action.payload;
    },
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

export default characterSlice.reducer;
export const { selectCharacter } = characterSlice.actions;
