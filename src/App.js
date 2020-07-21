import React from 'react';

// import styles from './app.module.css';
import Header from './components/header';
import Footer from './components/footer';
// import Register from './components/register';
// import Login from './components/login';
// import CreateBook from './components/book-create';
import Books from './components/book-all';

function App() {
  return (
    <div>
      <Header />
      {/* <Register /> */}
      {/* <Login/> */}
      {/* <CreateBook/> */}
      <Books />
      <Footer />
    </div>
  );
}

export default App;
