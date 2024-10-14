import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeController from './components/Home/HomeController';
import RegisterContainer from './components/Register/RegisterContainer';
import MyProfile from './components/MyProfile/MyProfile';
import NavBar from './components/NavBar/NavBar';
import {User, UserContext} from "./components/Context/UserContext"
import LoginController from './components/Login/LoginController';
import CommentController from './components/Comment/CommentController';

function App() : JSX.Element {
  const [user, setUser] = useState<User>({} as any)
  return (
    <div className='App'>
      <NavBar/>
      <UserContext.Provider value={user}>
      <Routes>
        <Route path="/MyProfile" element={<MyProfile/>}/>
        <Route path="/" element={<HomeController />}/>
        <Route path="/register" element={<RegisterContainer/>}/>
        <Route path="/login" element={<LoginController setUser={setUser} />} />
        <Route path="/comment" element={<CommentController />} />
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
