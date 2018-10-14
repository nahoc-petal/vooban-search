import * as React from 'react';

export interface ICity {
  name: string;
  lat: string;
  long: string;
  stateprov: string;
  country: string;
};

export const City: React.SFC<ICity> = ({ name, lat, long, stateprov, country }) => (
  <tr>
    <td>{name}, {stateprov}, {country}</td>
    <td className="has-text-right">{lat}</td>
    <td className="has-text-right">{long}</td>
  </tr>
);

