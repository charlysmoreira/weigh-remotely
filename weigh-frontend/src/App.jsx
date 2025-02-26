import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard"/>} ></Route>
      <Route path="/login" element={<Login/>} ></Route>
      <Route path="/admin-dashboard" element={<AdminDashboard/>} ></Route>
      <Route path="/user-dashboard" element={<UserDashboard/>} ></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
