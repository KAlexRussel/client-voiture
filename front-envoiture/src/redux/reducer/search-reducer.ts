import { createSlice } from '@reduxjs/toolkit';
import { TSearchState } from 'src/types/search';
import { fDate } from 'src/utils/format-time';

const initialState: TSearchState = {
  isLoading: false,
  searchResult: [],
  searchCityList: [],
  error: null,
  trajets: [],
  trajet: null,
  searchItems: {
    from: '',
    to: '',
    date: null,
    nbPassenger: 1,
    // type: 'conducteur',
  },
};

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    //  START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    //  HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    //  GET trajet list
    getTrajetList(state, action) {
      state.isLoading = false;
      state.trajets = action.payload;
    },
    //  GET trajet
    getTrajet(state, action) {
      state.isLoading = false;
      state.trajet = action.payload;
    },
    //  GET search trajet
    getSearchTrajet(state, action) {
      state.isLoading = false;
      state.searchResult = action.payload;
    },
    //  GET search Items
    getSearchItems(state, action) {
      state.isLoading = false;
      state.searchItems= action.payload;
    },
    //  GET search Items
    getCitiesList(state, action) {
      state.isLoading = false;
      state.searchCityList = action.payload;
    },
  },
});

// to root reducer
export default search.reducer;

// to action
export const { getCitiesList, getTrajetList, getSearchItems, getSearchTrajet, getTrajet, startLoading, hasError } =
  search.actions;
