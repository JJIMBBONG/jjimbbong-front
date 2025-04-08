import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Layout from './layouts/Layout';
import Main from './views/Main';
import NaverMap from './components/NaverMap';
import { AUTH_PATH, MAIN_PATH, MAP_PATH, OTHERS_PATH } from './constants';
import Auth from './views/Auth';
import Boards from './views/Boards';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route index element={<Main />} />
        <Route path={MAIN_PATH} element={<Main />} />
        <Route path={MAP_PATH} element={<NaverMap />} />
        <Route path={AUTH_PATH} element={<Auth />} />
        <Route path='boards' element={<Boards />} />

        <Route path={OTHERS_PATH} element={<>404 페이지</>} />
      </Route>
    </Routes>
  );
}

export default App;
