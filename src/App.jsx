import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/home";
import Register from "./pages/register";
import Login from './pages/login';
import { ProtectedRoute } from './pages/protectedRoute';
import { AuthProvider } from './context/authContext';


const App = () => {
  

  return (
    <>
    
    <Router>
      <AuthProvider>
      <Routes>
      <Route path='/' element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/register' element = {<Register/>}/>
      </Routes>
      </AuthProvider>
    </Router>
    
    </>
  );
};


export default App;
