import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Products from './components/Products';
import About from './components/About';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/less/global.less';
import './styles/less/home/main.less';
import './styles/less/home/mobile.less';

function App() {
  return (
    <>
      <Header />
      <Main />
      <Products />
      <About />
      <Partners />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
