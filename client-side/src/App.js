import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import LoginRegister from './components/LoginRegister';
import Favourites from './components/Favourites';
import PersonalDetails from './components/PersonalDetails';
import Discover from './components/Discover';
import SpecificRecipe from './components/SpecificRecipe';
import { Auth } from './auth/Auth';
import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import './style.css'
import './App.css';

export const AppContext = createContext(null);
export const MealContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState();
  const [mealDetails, setMealDetails] = useState();
  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      <MealContext.Provider value={{ mealDetails, setMealDetails }}>
        <div className="App">
          <Routes>
            <Route path='/login' element={<LoginRegister title='Login' />} />
            <Route path='/register' element={<LoginRegister title='Register' />} />
            <Route path='/' element={<HomePage />} />
            <Route path="/meal/:id" element={<SpecificRecipe />} />
            <Route path='/favourites' element={<Auth><Favourites /></Auth>} />
            <Route path='/details' element={<Auth><PersonalDetails /></Auth>} />
            <Route path='/discover' element={<Discover />} />
          </Routes>
        </div>
      </MealContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
