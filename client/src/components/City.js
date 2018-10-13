import * as React from 'react';

export const City = ({ name, lat, lng }) => (
  <tr>
    <td>{name}</td>
    <td className="has-text-right">{lat}</td>
    <td className="has-text-right">{lng}</td>
  </tr>
);

