import SearchService from './../services/SearchService'; 
import {
  RESET_SEARCH,
  SET_SEARCH_TERM,
  SEARCH_CITIES_REQUEST,
  SEARCH_CITIES_SUCCESS,
  SEARCH_CITIES_FAILURE,
} from './constants';

export const setSearchTerm = (searchTerm) => dispatch => {
  dispatch({
    type: SET_SEARCH_TERM,
    searchTerm,
  });
}
export const resetSearch = () => dispatch => {
  dispatch({
    type: RESET_SEARCH,
    cities: [],
  });
}

export const searchCities = (searchTerm) => {
  return async(dispatch) => {
    dispatch({ 
      type: SEARCH_CITIES_REQUEST, 
      isSearching: true,
    });

    try {
      const response = await SearchService.getCitiesBySearchTerm(searchTerm);
      console.log(response);
      dispatch({
        type: SEARCH_CITIES_SUCCESS,
        isSearching: false,
        cities: response.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({ 
        type: SEARCH_CITIES_FAILURE,
        errorMessage: 'Une erreur est survenue',
        isSearching: false, 
      });
    }
  };
}