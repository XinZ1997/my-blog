import { React, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Nav from './components/nav/index';
import Excel2List from './components/excel-to-list/index';

function App() {
  useEffect(() => {}, []);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Nav />
        <div className="route">
          <Routes>
            <Route path="/excel2List" element={<Excel2List />} />
            <Route path="/" element={<div>这是主页，不知道写啥</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
