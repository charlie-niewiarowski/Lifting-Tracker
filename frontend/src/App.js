import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Workout from './pages/Workout'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/workout" 
              element={user ? <Workout /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/workout" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/workout" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;