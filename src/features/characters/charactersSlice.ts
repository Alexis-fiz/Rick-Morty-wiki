import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCharacters } from '../../api/characters';

export interface CharactersState {
  info: any;
  page: number;
  loading: boolean;
  character: any | null;
  characters: any[];
  allCharacters: any;
}

const initialState: CharactersState = {
  info: 0,
  page: 1,
  loading: false,
  character: null,
  characters: [],
  allCharacters: {},
};

export const getAllCharactersAsync = createAsyncThunk(
  'characters/fetchCharacters',
  async (params?: any) => {
    const {characters, info} = await getCharacters(params);
    const {page} = params
    return {characters, info, page};
  }
);

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setShowCharacters: (state, action) => {
      state.characters = action.payload.characters;
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCharactersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCharactersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.page = action.payload.page;
        state.characters = action.payload.characters;
        state.allCharacters = {...state.allCharacters, [action.payload.page]: action.payload.characters};
      })
      .addCase(getAllCharactersAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});



export default charactersSlice.reducer;
export const { setShowCharacters } = charactersSlice.actions;
