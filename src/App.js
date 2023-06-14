import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/common/Navbar';
import OpenRoute from "./Components/core/Auth/OpenRoute"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Error from './Pages/Error';
import About from './Pages/About';

function App() {
  return (
    <div className='flex flex-col w-screen min-h-screen bg-richblack-900 font-inter '>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
