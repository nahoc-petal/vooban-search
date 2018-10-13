import * as React from 'react';
import { City } from './City';

const buttonStyle = {
  backgroundColor: 'transparent',
};

export const CitiesList = ({ cities, isSearching }) => (
  <table className="table is-fullwidth is-striped">
    <thead>
      <tr>
        <th>Nom</th>
        <th className="has-text-right">Latitude</th>
        <th className="has-text-right">Longitude</th>
      </tr>
    </thead>
    <tbody>
      {isSearching &&
        <tr>
          <td colSpan="3" className="has-text-centered">
            <button className="button is-white is-loading" style={buttonStyle} disabled>Loading...</button>
          </td>
        </tr>
      }

      {cities.length > 0 && cities.map((city, i) => 
        <City 
          key={i}
          name={city.name}
          lat={city.lat}
          lng={city.lng}
        />)
      }
    </tbody>
  </table>
);