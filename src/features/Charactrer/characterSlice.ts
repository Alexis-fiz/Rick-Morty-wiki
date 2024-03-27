import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CharacterState {
  character: any; // Define your character type here
  loading: boolean;
  error: string | null;
}

const initialState: CharacterState = {
  character: null,
  loading: false,
  error: null
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    selectCharacter: (state, action) => {
      state.character = action.payload;
    },
    fetchCharacter: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    fetchCharacterFulfilled: (state, action: PayloadAction<any>) => {
      state.character = action.payload;
      state.loading = false;
    },
    fetchCharacterRejected: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchCharacter, fetchCharacterFulfilled, fetchCharacterRejected, selectCharacter } = characterSlice.actions;

export default characterSlice.reducer;
