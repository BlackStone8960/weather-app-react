import React from 'react';
import Header from './Header';

const Wrapper = ({ children }) => (
  <>
    <Header />
    <section className="main">
      <div className="main-container">
        { children }
      </div>
    </section>
    {/* Footer */}
  </>
);

export default Wrapper;