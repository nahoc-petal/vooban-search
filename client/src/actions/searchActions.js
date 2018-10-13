import SearchService from './../services/SearchService'; 

export const setSearchTerm = (searchTerm) => dispatch => {
  dispatch({
    type: 'SET_SEARCH_TERM',
    searchTerm,
  })
}

export const searchCities = (searchTerm) => {
  return async(dispatch) => {
    dispatch({ 
      type: 'SEARCH_CITIES_REQUEST', 
      isSearching: true,
    });

    try {
      const response = await SearchService.getCities(searchTerm);
      dispatch({
        type: 'SEARCH_CITIES_SUCCESS',
        isSearching: false,
        cities: response.data.data.children,
      });
    } catch (e) {
      dispatch({ 
        type: 'SEARCH_CITIES_FAILURE',
        errorMessage: 'Error during fetch',
        isSearching: false, 
      });
    }
  };
}