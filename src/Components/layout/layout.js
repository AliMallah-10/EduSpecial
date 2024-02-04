import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const showHeaderAndFooter = location.pathname !== '/signin';

  return (
    <div>
      {showHeaderAndFooter && <Header />}
      <main>{children}</main>
      {showHeaderAndFooter && <Footer />}
    </div>
  );
};

export default Layout;
