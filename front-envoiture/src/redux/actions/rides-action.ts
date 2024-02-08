import { Dispatch } from '@reduxjs/toolkit';
import {
  createRideService,
  deleteRideByIdService,
  getRidePriceService,
  searchRideService,
} from 'src/services/rides-service';
import { TRides, TSearchRide } from 'src/types/ride';
import axios from 'axios';
import {
  getCalculatedPrice,
  getCitiesAutocompletList,
  getFormSearchItems,
  getSearchResult,
  getSelectedRide,
  setNewRide,
  startLoading,
} from '../reducer/ride-reducer';
import { getUserRidesInformation } from '../reducer/account-reducer';

// get ride price
export function getRidePriceAction(from: any, to: any) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const data = {
        start: {
          latitude: from[1],
          longitude: from[0],
        },
        end: {
          latitude: to[1],
          longitude: to[0],
        },
      };
      const res = await getRidePriceService(data);
      dispatch(getCalculatedPrice(res.data));
    } catch (error) {
      console.error(error);
    }
  };
}

// Pulish new ride
export function postRideAction(data: TRides) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await createRideService(data);
      dispatch(setNewRide(res.data.data));
      dispatch(getSelectedRide(res.data.data));
      dispatch(getUserRidesInformation(res.data.data))
    } catch (error) {
      console.error(error);
    }
  };
}

// Pulish new ride
export function deleteRideByIdAction(id: number) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await deleteRideByIdService(id);
    } catch (error) {
      console.error(error);
    }
  };
}

// get search trajet
export function getSearchResultAction(searchItems: TSearchRide) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await searchRideService(searchItems);
      dispatch(getSearchResult(res.data.data));
      dispatch(getFormSearchItems(searchItems))
    } catch (error) {
      console.error(error);
    }
  };
}

// get cities autocomplete list
export function getCitiesAutocompletAction(searchCity: string) {
  return async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchCity)}.json`,
        {
          params: {
            access_token:
              'sk.eyJ1Ijoiamx3MjMiLCJhIjoiY2xrbGkwc2pxMDVxMjNmczhqMmlldXB6OSJ9.PegeORLIwJXt5bmQ7BwkGA',
            types: 'address,place',
            limit: 5,
            country: 'FR', // get place only in france
          },
        }
      );
      if (res.data.features) {
        dispatch(getCitiesAutocompletList(res.data.features));
      }
    } catch (error) {
      console.error(error);
    }
  };
}
