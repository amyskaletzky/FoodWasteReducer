import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import LoginRegister from './components/LoginRegister';
import Favourites from './components/Favourites';
import PersonalDetails from './components/PersonalDetails';
import Discovery from './components/Discovery';
// here import Auth
import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import './App.css';

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState();
  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/login' element={<LoginRegister title='Login' />} />
          <Route path='/register' element={<LoginRegister title='Register' />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/details' element={<PersonalDetails />} />
          <Route path='/discover' element={<Discovery />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
