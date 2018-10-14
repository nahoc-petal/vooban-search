import * as React from 'react';
import CitiesSearchAutocomplete from './CitiesSearchAutocomplete';
import Footer from './Footer';

const fullpage: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100vh',
};

export default () => (
  <div style={fullpage}>
    <div className="container">
      <section className="section">
        <CitiesSearchAutocomplete />
      </section>
    </div>
    <Footer />
  </div>
);