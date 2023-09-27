import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Welcome, Login } from './pages/Login'



const App = () => {

  
  return (<Router>
            <Routes>
              <Route path="/" element={<Welcome />}>
                <Route index element={<Login />} />
              </Route>
              <Route path="/dashboard" element={<div>Dashboard</div>} />
            </Routes>
          </Router>)
}


export default App;
