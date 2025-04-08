import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Layout from './layouts/Layout';
import Main from './views/Main';
import NaverMap from './components/NaverMap';
import { AUTH_PATH, MAIN_PATH, MAP_PATH } from './constants';
import Auth from './views/Auth';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={MAIN_PATH} element={<Main />} />
        <Route path={MAP_PATH} element={<NaverMap />} />
        <Route path={AUTH_PATH} element={<Auth />} />

        
      </Route>
    </Routes>
  );
}

export default App;
