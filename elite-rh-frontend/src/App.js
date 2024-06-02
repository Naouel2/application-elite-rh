
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from './pages/Login';
import Home from './pages/Home'
import Formation from './pages/Formation';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import About from './pages/About';
import CreateUser from './pages/CreateUser';
import CreateFormation from './pages/Createformation';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/compte" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/formation/:id" element={<ProtectedRoute><Formation /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/create-user" element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
        <Route path="/create-formation" element={<ProtectedRoute><CreateFormation /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
