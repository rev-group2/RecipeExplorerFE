import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeController from './components/Home/HomeController';
import NavBar from './components/NavBar/NavBar';
import {User, UserContext} from "./components/Context/UserContext"
import LoginController from './components/Login/LoginController';
import RecipeFormController from './components/RecipeForm/RecipeFormController';
import ProfileController from './components/Profile/ProfileController';
import RegisterController from './components/Register/RegisterController';
import RecipeDetailsController from './components/RecipeDetails/RecipeDetailsController';
import SearchResultsController from './components/SearchResults/SearchResultsController';

function App() : JSX.Element {
  const [user, setUser] = useState<User>({} as any)
  
  return (
    <div className='App'>
      <UserContext.Provider value={user}>
      <NavBar setUser={setUser}/>
      <Routes>
        <Route path="/" element={<HomeController />}/>
        <Route path="/register" element={<RegisterController/>}/>
        <Route path="/login" element={<LoginController setUser={setUser} />} />
        <Route path='/profile/:id' element={<ProfileController setUser={setUser} />} />
        <Route path='/recipes' element={<RecipeFormController />}/>
        <Route path='/recipes/edit/:uuid' element={<RecipeFormController />}/>
        <Route path='/recipes/:uuid' element={<RecipeDetailsController />}/>
        <Route path='/search-results' element={<SearchResultsController/>}/>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
