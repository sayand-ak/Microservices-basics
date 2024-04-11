import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Home from './components/Home/Home.jsx';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App
