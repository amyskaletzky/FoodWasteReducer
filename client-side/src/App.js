import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import LoginRegister from './components/LoginRegister';
import Favourites from './components/Favourites';
import PersonalDetails from './components/PersonalDetails';
import Discover from './components/Discover';
import { Auth } from './auth/Auth';
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
          <Route path='/favourites' element={<Auth><Favourites /></Auth>} />
          <Route path='/details' element={<Auth><PersonalDetails /></Auth>} />
          <Route path='/discover' element={<Discover />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
