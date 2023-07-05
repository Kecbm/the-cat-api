import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        < Header />
        <Routes>
          <Route exact path="/" element={ <Home /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;