import * as React from 'react';
import { City, ICity } from './City';

export interface ICitiesList {
  cities: ICity[];
}

export const CitiesList: React.SFC<ICitiesList> = ({ cities }) => (
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
        />)}
    </tbody>
  </table>
);