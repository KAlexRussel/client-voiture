import { Dispatch } from '@reduxjs/toolkit';
import { _Trajets } from 'src/_mock/_trajet';
import { TSearch } from 'src/types/search';
import { fDate } from 'src/utils/format-time';
import moment from 'moment';
import axios from 'axios';
import {
  getSearchTrajet,
  getSearchItems,
  getTrajetList,
  startLoading,
  hasError,
  getCitiesList
} from '../reducer/search-reducer';

// get all search action
export function getAllTrajet() {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      dispatch(getTrajetList(_Trajets));
    } catch (error) {
      console.error(error);
      dispatch(hasError(error));
    }
  };
}

// get search trajet
export function getSearchTrajets(searchData: TSearch) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const result = _Trajets.filter(
        (trajet) =>
          (trajet.from === searchData.from &&
            trajet.to === searchData.to &&
            trajet.date === fDate(searchData.date) &&
            searchData.nbPassenger <= trajet.availablePlace) ||
          (trajet.from === searchData.from &&
            trajet.to === searchData.to &&
            trajet.date === fDate(searchData.date))
      );
      dispatch(getSearchTrajet(result));
    } catch (error) {
      console.error(error);
      dispatch(hasError(error));
    }
  };
}

// get search trajet
export function getSearchItem(searchItems: TSearch) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const items = {
        from: searchItems.from,
        to: searchItems.to,
        date: moment(searchItems.date).format('DD/MM/YYYY'),
        nbPassenger: searchItems.nbPassenger,
      };
      dispatch(getSearchItems(items));
    } catch (error) {
      console.error(error);
      dispatch(hasError(error));
    }
  };
}

// get search city
export function getCities(searchCity: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchCity
        )}.json`,
        {
          params: {
            access_token: 'sk.eyJ1Ijoiamx3MjMiLCJhIjoiY2xrbGkwc2pxMDVxMjNmczhqMmlldXB6OSJ9.PegeORLIwJXt5bmQ7BwkGA',
            types: 'address,place',
            limit: 5,
            country: 'FR', // get place only in france
          },
        }
      );
      if (res.data.features) {
        
        dispatch(getCitiesList(res.data.features));
      }
    } catch (error) {
      console.error(error);
      dispatch(hasError(error));
    }
  };
}