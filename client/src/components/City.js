import * as React from 'react';

export const City = ({ name, lat, long, stateprov, country }) => (
  <tr>
    <td>{name}, {stateprov}, {country}</td>
    <td className="has-text-right">{lat}</td>
    <td className="has-text-right">{long}</td>
  </tr>
);

