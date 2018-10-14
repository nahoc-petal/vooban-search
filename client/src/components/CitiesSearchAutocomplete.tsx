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
}

export class CitiesSearchAutocomplete extends React.Component<ICitiesSearchAutocomplete> {

  public static defaultProps: Partial<ICitiesSearchAutocomplete> = {
    cities: [],
    errorMessage: '',
    isSearching: false,
    searchTerm: '',
  };

  public componentDidUpdate(prevProps: ICitiesSearchAutocomplete) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.searchCities();
    }
  }

  public onSetSearchTerm = (searchTerm: string) => {
    this.props.setSearchTerm(searchTerm);
  }

  public searchCities = () => {
    if(this.props.searchTerm.length === 0) {
      this.props.resetSearch();
    }

    if(this.props.searchTerm.length >= 3) {
      this.props.searchCities(this.props.searchTerm);
    }
  }

  public render() {
    const { 
      cities,
      errorMessage,
      isSearching,
    } = this.props;

    return (
      <div>
        <SearchInput 
          isSearching={isSearching} 
          onSetSearchTerm={this.onSetSearchTerm}
        />
        {cities && cities.length > 0 &&
          <div className="box">
            <CitiesList
              cities={cities}
            />
          </div>
        }
        {errorMessage &&
          <div className="notification">
            {errorMessage}
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const {
    cities,
    searchTerm,
    isSearching,
    errorMessage,
  } = state.searchReducer;

  return ({
    cities,
    errorMessage,
    isSearching,
    searchTerm,
  });
}

 const mapDispatchToProps = (dispatch: any) => ({
  resetSearch: () => dispatch(resetSearch()),
  searchCities: (searchTerm: string) => dispatch(searchCities(searchTerm)),
  setSearchTerm: (searchTerm: string) => dispatch(setSearchTerm(searchTerm)),
 });

export default connect(mapStateToProps, mapDispatchToProps)(CitiesSearchAutocomplete);
