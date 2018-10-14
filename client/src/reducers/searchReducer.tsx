export default (state = {
  cities: [],
  errorMessage: '',
  isSearching: false,
  searchTerm: '',
}, action: any) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    case 'SEARCH_CITIES_REQUEST':
      return {
        ...state,
        isSearching: action.isSearching,
      };
    case 'SEARCH_CITIES_SUCCESS':
      return {
        ...state,
        cities: action.cities,
        isSearching: action.isSearching,
      };
    case 'SEARCH_CITIES_FAILURE':
      return {
        ...state,
        errorMessage: action.errorMessage,
        isSearching: action.isSearching,
      };
    case 'RESET_SEARCH':
      return {
        ...state,
        cities: action.cities,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
}