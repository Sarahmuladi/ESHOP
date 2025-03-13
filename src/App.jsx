import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/home";
import Register from "./pages/register";
import Login from './pages/login';
import Cart from "./pages/cart";
import { ProtectedRoute } from './pages/protectedRoute';
import { AuthProvider } from './context/authContext';
import { CartProvider } from "./context/cartContext";


const App = () => {
  

  return (
    <>
    
    <Router>
      <AuthProvider>
        <CartProvider>
      <Routes>
      <Route path='/' element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/cart' element = {<ProtectedRoute><Cart/></ProtectedRoute>}/>
      </Routes>
      </CartProvider>
      </AuthProvider>
    </Router>
    
    </>
  );
};


export default App;
