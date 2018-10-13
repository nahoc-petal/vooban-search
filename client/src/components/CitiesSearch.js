import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchInput from './SearchInput';
import { CitiesList } from './CitiesList';
import { searchCities } from '../actions/searchActions';

export class CitiesSearch extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.searchCities();
    }
  }

  searchCities = () => {
    if(this.props.searchTerm.length >= 3) {
      this.props.searchCities(this.props.searchTerm);
    }
  }

  render() {
    const { 
      cities,
      errorMessage,
      isSearching,
    } = this.props;

    return (
      <div>
        <SearchInput isSearching={isSearching} />
        {cities &&
          <CitiesList
            isSearching={isSearching}
            cities={cities}
          />
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

const mapStateToProps = state => {
  const {
    cities,
    searchTerm,
    isSearching,
    errorMessage,
  } = state.searchReducer;

  return ({
    cities,
    searchTerm,
    isSearching,
    errorMessage,
  });
}

 const mapDispatchToProps = dispatch => ({
  searchCities: (searchTerm) => dispatch(searchCities(searchTerm))
 });

export default connect(mapStateToProps, mapDispatchToProps)(CitiesSearch);
