import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Layout from './layouts/Layout';
import Main from './views/Main';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='main' element={<Main />} />

        
      </Route>
    </Routes>
  );
}

export default App;
