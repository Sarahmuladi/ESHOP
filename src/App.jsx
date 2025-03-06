import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/home";
import Register from "./pages/register";
import Test from './pages/test';
import Login from './pages/login';
//import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './pages/protectedRoute';


function App() {
  

  return (
    <>
    
    <Router>
      <Routes>
      <Route path='/' element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/register' element = {<Register/>}/>
      </Routes>
    </Router>
    
    </>
  )
}

export default App;
