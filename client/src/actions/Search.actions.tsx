import SearchService from './../services/Search.service'; 
import {
  RESET_SEARCH,
  SEARCH_CITIES_FAILURE,
  SEARCH_CITIES_REQUEST,
  SEARCH_CITIES_SUCCESS,
  SET_SEARCH_TERM,
} from './actions.constants';

export const setSearchTerm = (searchTerm: string) => (dispatch: any) => {
  dispatch({
    searchTerm,
    type: SET_SEARCH_TERM,
  });
}
export const resetSearch = () => (dispatch: any) => {
  dispatch({
    cities: [],
    errorMessage: '',
    type: RESET_SEARCH,
  });
}

export const searchCities = (searchTerm: string) => {
  return async (dispatch: any) => {
    dispatch({ 
      isSearching: true,
      type: SEARCH_CITIES_REQUEST, 
    });

    try {
      const response = await SearchService.getCitiesBySearchTerm(searchTerm);
      dispatch({
        cities: response.data.suggestions,
        isSearching: false,
        type: SEARCH_CITIES_SUCCESS,
      });
    } catch (e) {
      dispatch({ 
        errorMessage: 'Une erreur est survenue',
        isSearching: false, 
        type: SEARCH_CITIES_FAILURE,
      });
    }
  };
}