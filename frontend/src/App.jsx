import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Fetch user data using the stored token if necessary
      setToken(storedToken);
      // Here, you could make an API call to get the user data and setUser
      // For example:
      // axios.get('/api/employers/me', { headers: { Authorization: `Bearer ${storedToken}` } })
      //   .then(response => setUser(response.data))
      //   .catch(error => console.error('Failed to fetch user:', error));
    }
  }, []);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const signup = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('token', token);
  };

  console.log(token,user)

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <Navigate to="/login" /> : <Home user={user} />}
        />
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/signup" element={<SignupPage signup={signup} />} />
        <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
