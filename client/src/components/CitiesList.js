import * as React from 'react';
import { City } from './City';

export const CitiesList = ({ cities }) => (
  <table className="table is-fullwidth is-striped">
    <thead>
      <tr>
        <th>Nom</th>
        <th className="has-text-right">Latitude</th>
        <th className="has-text-right">Longitude</th>
      </tr>
    </thead>
    <tbody>
      {cities.map((city, i) => 
        <City 
          key={i}
          name={city.name}
          lat={city.lat}
          long={city.long}
          stateprov={city.stateprov}
          country={city.country}
        />)
      }
    </tbody>
  </table>
);