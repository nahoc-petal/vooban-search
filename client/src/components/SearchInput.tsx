import * as React from 'react';

export interface ISearchInputProps {
  isSearching?: boolean;
  searchTerm?: string;
  onSetSearchTerm: (searchTerm: string) => void;
};

const SearchInput: React.SFC<ISearchInputProps> = ({ isSearching, searchTerm, onSetSearchTerm }) => (
  <div className="field">
    <p className={`control has-icons-left is-medium ${isSearching && 'is-loading'}`}>
      <input 
        className="input is-rounded is-medium" 
        type="text"
        placeholder="Search" 
        onChange={e => onSetSearchTerm(e.target.value)}
        value={searchTerm} 
      />
      <span className="icon is-small is-left">
        <i className="fas fa-search" />
      </span>
    </p>
  </div>
);

export default SearchInput;
