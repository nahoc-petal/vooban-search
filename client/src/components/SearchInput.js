import React from 'react'
import { connect } from 'react-redux'
import { setSearchTerm } from '../actions/searchActions';

const searchInputStyle = {
  marginBottom: '40px',
};

const SearchInput = ({ isSearching, searchTerm, setSearchTerm }) => (
  <div style={searchInputStyle} className="field">
    <p className={`control has-icons-left is-medium ${isSearching && 'is-loading'}`}>
      <input 
        className="input is-rounded is-medium" 
        type="text"
        placeholder="Search" 
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm} 
      />
      <span className="icon is-small is-left">
        <i className="fas fa-search" />
      </span>
    </p>
  </div>
);

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  setSearchTerm: (searchTerm) => dispatch(setSearchTerm(searchTerm))
 });

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
