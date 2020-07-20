import React from 'react';

// import styles from './app.module.css';
import Header from './components/header';
import Footer from './components/footer';
import CreateBook from './components/book-create';
// import Register from './components/register';
// import Login from './components/login';

function App() {
  return (
    <div>
      <Header />
      <CreateBook/>
      {/* <Register /> */}
      {/* <Login/> */}
      <Footer />
    </div>
  );
}

export default App;
