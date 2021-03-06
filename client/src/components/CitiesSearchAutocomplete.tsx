import * as React from 'react';
import { connect } from 'react-redux';
import { resetSearch, searchCities, setSearchTerm } from './../actions/Search.actions';
import { CitiesList } from './CitiesList';
import { ICity } from './City';

import SearchInput from './SearchInput';

export interface ICitiesSearchAutocomplete {
  cities: ICity[];
  errorMessage: string;
  isSearching: boolean;
  resetSearch: () => any;
  searchCities: (searchTerm: string) => any;
  setSearchTerm: (searchTerm: string) => any;
  searchTerm: string;
  status: number | null;
}

export class CitiesSearchAutocomplete extends React.Component<ICitiesSearchAutocomplete> {

  public static defaultProps: Partial<ICitiesSearchAutocomplete> = {
    cities: [],
    errorMessage: '',
    isSearching: false,
    searchTerm: '',
    status: null,
  };

  public componentDidUpdate(prevProps: ICitiesSearchAutocomplete) {
    prevProps.searchTerm !== this.props.searchTerm ? this.searchCities() : null;
  }

  public onSetSearchTerm = (searchTerm: string) => {
    this.props.setSearchTerm(searchTerm);
  }

  public searchCities = () => {
    this.props.searchTerm.length === 0 ? this.props.resetSearch() : null; // empty
    this.props.searchTerm.length >= 3 ? this.props.searchCities(this.props.searchTerm) : null; // more than 3 characters
  }

  public render() {
    const { 
      cities,
      errorMessage,
      isSearching,
      status,
    } = this.props;

    return (
      <div>
        <SearchInput 
          isSearching={isSearching} 
          onSetSearchTerm={this.onSetSearchTerm}
        />
        {cities && cities.length > 0 &&
          <CitiesList
            cities={cities}
          />
        }
        {status && status === 404 &&
          <div className="notification">
            Aucune ville trouvée
          </div>
        }
        {errorMessage &&
          <div className="notification is-danger">
            {errorMessage}
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  console.log(state);
  const {
    cities,
    searchTerm,
    isSearching,
    errorMessage,
    status,
  } = state.searchReducer;

  return ({
    cities,
    errorMessage,
    isSearching,
    searchTerm,
    status,
  });
}

 const mapDispatchToProps = (dispatch: any) => ({
  resetSearch: () => dispatch(resetSearch()),
  searchCities: (searchTerm: string) => dispatch(searchCities(searchTerm)),
  setSearchTerm: (searchTerm: string) => dispatch(setSearchTerm(searchTerm)),
 });

export default connect(mapStateToProps, mapDispatchToProps)(CitiesSearchAutocomplete);
