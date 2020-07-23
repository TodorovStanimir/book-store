import React from 'react';

import Header from './components/header';
import Footer from './components/footer';

const PageLayout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default PageLayout;
