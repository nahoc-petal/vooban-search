import { Action, Dispatch } from 'redux';
import { ICity } from '../components/City';
import SearchService from './../services/Search.service'; 
import {
  RESET_SEARCH,
  SEARCH_CITIES_FAILURE,
  SEARCH_CITIES_REQUEST,
  SEARCH_CITIES_SUCCESS,
  SET_SEARCH_TERM,
} from './actions.constants';

export const setSearchTerm = (searchTerm: string) => (dispatch: Dispatch<{searchTerm: string, type: string}>): Action => (
  dispatch({
    searchTerm,
    type: SET_SEARCH_TERM,
  })
);

export const resetSearch = () => (dispatch: Dispatch<{cities: ICity[], errorMessage: string, type: string, status: number | null}>): Action => (
  dispatch({
    cities: [],
    errorMessage: '',
    status: null,
    type: RESET_SEARCH,
  })
);



export const searchCities = (searchTerm: string) => {
  return async (dispatch: Dispatch<{errorMessage?:string, isSearching: boolean, type: string, status?: number | null}>): Promise<Action> => {
    dispatch({ 
      isSearching: true,
      type: SEARCH_CITIES_REQUEST, 
    });

    try {
      const response = await SearchService.getCitiesBySearchTerm(searchTerm);
      return dispatch({
        cities: response.data.suggestions,
        isSearching: false,
        status: response.data.suggestions.status,
        type: SEARCH_CITIES_SUCCESS,
      });
    } catch (e) {
      return dispatch({ 
        errorMessage: 'Une erreur est survenue',
        isSearching: false, 
        status: 400,
        type: SEARCH_CITIES_FAILURE,
      });
    }
  };
}