import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Entete from '../Entete/Entete';
import Accueil from '../Accueil/Accueil';
import ListeFilms from '../ListeFilms/ListeFilms';
import Film from '../Film/Film';
import Admin from '../Admin/Admin';
import Page404 from '../Page404/Page404';

export const AppContext = React.createContext();

function App() {

  const location = useLocation(),
        [logging, setLogging] = useState({ estLog: false, usager: '' });

  function login(e){
    
    e.preventDefault();

    if (e.target.usager.value === 'admin'){
      setLogging(logging => ({ ...logging, estLog: true, usager: e.target.usager.value }));
    } 

  }

  function logout(e) {

    e.preventDefault();
    setLogging({ estLog: false, usager: '' });

  }

  return (

    <AppContext.Provider value={logging}>
      <Entete handleLogin={login} handleLogout={logout} />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.key}>
          <Route path='/' element={<Accueil />} />
          <Route path='/liste-films' element={<ListeFilms />} />
          <Route path='/film/:id' element={<Film />} />
          <Route path='/admin' element={logging.estLog ? <Admin /> : <Navigate to='/' />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </AnimatePresence>
    </AppContext.Provider>

  );

}

export default App;