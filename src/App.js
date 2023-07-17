import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Request from './pages/Request';
import Cats from './pages/Cats';
import CatForBreed from './pages/CatForBreed';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        < Header />
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route exact path="/request" element={ <Request /> } />
          <Route exact path="/cats" element={ <Cats /> } />
          <Route exact path="/catforbreed" element={ <CatForBreed /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;