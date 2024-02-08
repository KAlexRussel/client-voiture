import { createSlice } from '@reduxjs/toolkit';
import { TRideState } from 'src/types/ride';

const initialState: TRideState = {
  isLoading: false,
  newRide: null,
  searchRidesResult: [],
  searchItems: null,
  selectedRide: null,
  cityAutocompletList: [],
  calculatedPrice: {
    max: 0,
    min: 0,
    percentage: '0',
    recommanded: 0,
    distance: 0,
    speed: '0',
    time: 0
  },
};

const rides = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    //  START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    //  GET calculated price
    getCalculatedPrice(state, action) {
      state.isLoading = false;
      state.calculatedPrice = action.payload;
    },
    // increase price
    increasePrice(state) {
      const updatePrice = Math.min(state.calculatedPrice.recommanded + 1, state.calculatedPrice.max)
      state.calculatedPrice.recommanded = updatePrice;
    },

    // decrease price
    decreasePrice(state) {
      const updatePrice = Math.max(state.calculatedPrice.recommanded - 1, state.calculatedPrice.min)
      state.calculatedPrice.recommanded = updatePrice;
    },

    //  set new ride
    setNewRide(state, action) {
      state.isLoading = false;
      state.newRide = action.payload;
    },

    //  GET search result
    getSearchResult(state, action) {
      state.isLoading = false;
      state.searchRidesResult= action.payload;
    },
    //  GET search Items
    getCitiesAutocompletList(state, action) {
      state.isLoading = false;
      state.cityAutocompletList = action.payload;
    },

    //  GET search Items
    getFormSearchItems(state, action) {
      state.isLoading = false;
      state.searchItems = action.payload;
    },

    //  GET selected ride
    getSelectedRide(state, action) {
      state.isLoading = false;
      state.selectedRide = action.payload;
    },
  },
});

// to root reducer
export default rides.reducer;

// to action
export const { getSelectedRide, getFormSearchItems, getCitiesAutocompletList, getSearchResult, setNewRide, decreasePrice, increasePrice, getCalculatedPrice, startLoading } = rides.actions;
