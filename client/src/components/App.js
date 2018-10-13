import React from 'react';
import Footer from './Footer';
import CitiesSearch from './CitiesSearch';

const fullpage = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

export default () => (
  <div style={fullpage}>
    <div className="container">
      <section className="section">
        <CitiesSearch />
      </section>
    </div>
    <Footer />
  </div>
);